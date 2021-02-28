import LottoTicket from './LottoTicket.js';
import { getRateOfReturn } from '../utils/general.js';
import {
  APP_INIT,
  PURCHASE_AMOUNT_COMPLETED,
  PURCHASE_OPTION_COMPLETED,
  TICKET_ISSUE_COMPLETED,
  WINNING_NUMBER_COMPLETED,
  RESULT_REQUESTED,
  APP_RESET,
} from '../constants/appStages.js';
import { LOTTO_PRICE, WINNING_PRIZE } from '../constants/lottoRules.js';
import { RATE_OF_RETURN_DECIMAL_PLACE } from '../constants/display.js';

export default class AppStageManager {
  constructor() {
    this.stage = APP_INIT;
    this.lottoTickets = [];
    this.winningNumber = {};
    this.rateOfReturn = 0;

    this.subscribers = {
      [PURCHASE_AMOUNT_COMPLETED]: [],
      [PURCHASE_OPTION_COMPLETED]: [],
      [TICKET_ISSUE_COMPLETED]: [],
      [WINNING_NUMBER_COMPLETED]: [],
      [RESULT_REQUESTED]: [],
      [APP_RESET]: [],
    };

    this.selfSubscribe();
  }

  subscribe(stage, subscriber) {
    this.subscribers[stage].push(subscriber);
  }

  unsubscribe(stage, subscriber) {
    this.subscribers[stage].splice(this.subscribers.indexOf(subscriber), 1);
  }

  notifySubscribers(stage) {
    this.subscribers[stage]?.forEach((subscriber) => subscriber());
  }

  createTickets() {
    const numToCreate = this.numOfLotto - this.lottoTickets.length;

    this.lottoTickets = [...this.lottoTickets, ...Array(numToCreate)].map(() => new LottoTicket());
    this.setStates({ stage: TICKET_ISSUE_COMPLETED });
  }

  scoreTickets() {
    if (this.lottoTickets.length > 0 && Object.keys(this.winningNumber).length > 0) {
      this.lottoTickets.forEach((lottoTicket) => lottoTicket.setTotalMatchCount(this.winningNumber));
    }
  }

  calculateRateOfReturn() {
    const profit = this.lottoTickets.reduce((acc, lottoTicket) => acc + WINNING_PRIZE[lottoTicket.numOfMatch].PRIZE, 0);
    const loss = this.lottoTickets.length * LOTTO_PRICE;
    const rateOfReturn = getRateOfReturn(profit, loss);

    this.rateOfReturn =
      rateOfReturn % 1 !== 0 ? Number(rateOfReturn.toFixed(RATE_OF_RETURN_DECIMAL_PLACE)) : rateOfReturn;
  }

  selfSubscribe() {
    this.subscribe(PURCHASE_OPTION_COMPLETED, this.createTickets.bind(this));
    this.subscribe(WINNING_NUMBER_COMPLETED, this.scoreTickets.bind(this));
    this.subscribe(WINNING_NUMBER_COMPLETED, this.calculateRateOfReturn.bind(this));
    this.subscribe(APP_RESET, this.resetStates.bind(this));
  }

  setStates({ stage, numOfLotto, lottoTickets, winningNumber }) {
    this.stage = stage ?? this.stage;
    this.numOfLotto = numOfLotto ?? this.numOfLotto;
    this.lottoTickets = lottoTickets ?? this.lottoTickets;
    this.winningNumber = winningNumber ?? this.winningNumber;

    this.notifySubscribers(stage);
  }

  resetStates() {
    this.stage = APP_INIT;
    this.lottoTickets = [];
    this.winningNumber = {};
    this.rateOfReturn = 0;
  }
}
