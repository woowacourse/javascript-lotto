import LottoTicket from './LottoTicket.js';
import { getRateOfReturn } from '../utils/general.js';
import {
  TICKET_ISSUE_COMPLETED,
  WINNING_NUMBER_SUBMITTED,
  APP_RESET,
  RESULT_PREPARED,
} from '../constants/appStages.js';
import { LOTTO_PRICE, WINNING_PRIZE } from '../constants/lottoRules.js';
import { RATE_OF_RETURN_DECIMAL_PLACE } from '../constants/display.js';

export default class LottoManager {
  constructor({ stageManager }) {
    this.stageManager = stageManager;
    this.numOfLotto = 0;
    this.lottoTickets = [];
    this.winningNumber = {};
    this.rateOfReturn = 0;

    this.subscribe();
  }

  subscribe() {
    this.stageManager.subscribe(WINNING_NUMBER_SUBMITTED, this.calculateRateOfReturn.bind(this));
    this.stageManager.subscribe(APP_RESET, this.resetStates.bind(this));
  }

  issueTickets({ manualTickets }) {
    const autoTickets = [...Array(this.numOfLotto - manualTickets.length)].map(() => new LottoTicket());

    this.setStates({ lottoTickets: manualTickets.concat(autoTickets) });
    this.stageManager.setStates({ stage: TICKET_ISSUE_COMPLETED });
  }

  scoreTickets() {
    if (this.lottoTickets.length > 0 && Object.keys(this.winningNumber).length > 0) {
      this.lottoTickets.forEach((lottoTicket) => lottoTicket.setTotalMatchCount(this.winningNumber));
    }
  }

  calculateRateOfReturn() {
    this.scoreTickets();

    const profit = this.lottoTickets.reduce((acc, lottoTicket) => acc + WINNING_PRIZE[lottoTicket.numOfMatch].PRIZE, 0);
    const loss = this.lottoTickets.length * LOTTO_PRICE;
    const rateOfReturn = getRateOfReturn(profit, loss);

    this.setStates({
      rateOfReturn: rateOfReturn % 1 !== 0 ? Number(rateOfReturn.toFixed(RATE_OF_RETURN_DECIMAL_PLACE)) : rateOfReturn,
    });
  }

  setStates({ numOfLotto, lottoTickets, winningNumber, rateOfReturn }) {
    this.numOfLotto = numOfLotto ?? this.numOfLotto;
    this.lottoTickets = lottoTickets ?? this.lottoTickets;
    this.winningNumber = winningNumber ?? this.winningNumber;
    if (rateOfReturn) {
      this.rateOfReturn = rateOfReturn;
      this.stageManager.setStates({ stage: RESULT_PREPARED });
    }
  }

  resetStates() {
    this.numOfLotto = 0;
    this.lottoTickets = [];
    this.winningNumber = {};
    this.rateOfReturn = 0;
  }
}
