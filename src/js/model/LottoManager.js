import LottoTicket from './LottoTicket.js';
import { getRateOfReturn } from '../utils/general.js';
import {
  APP_INIT,
  PURCHASE_AMOUNT_COMPLETED,
  WINNING_NUMBER_COMPLETED,
  MODAL_OPENED,
  APP_RESET,
} from '../constants/appStages.js';
import { LOTTO_PRICE, WINNING_PRIZE } from '../constants/lottoRules.js';
import { RATE_OF_RETURN_DECIMAL_PLACE } from '../constants/display.js';

export default class LottoManager {
  constructor() {
    this.stage = APP_INIT;

    this.lottoTickets = [];
    this.winningNumber = {};
    this.rateOfReturn = 0;

    this.subscribers = {
      [PURCHASE_AMOUNT_COMPLETED]: [],
      [WINNING_NUMBER_COMPLETED]: [],
      [MODAL_OPENED]: [],
      [APP_RESET]: [],
    };
  }

  subscribe(stage, subscriber) {
    this.subscribers[stage].push(subscriber);
  }

  unsubscribe(stage, subscriber) {
    this.subscribers[stage].splice(this.subscribers.indexOf(subscriber), 1);
  }

  scoreEachTicket() {
    if (this.lottoTickets.length > 0 && Object.keys(this.winningNumber).length > 0) {
      this.lottoTickets.forEach((lottoTicket) => lottoTicket.setTotalMatchCount(this.winningNumber));
    }
  }

  getLottoROR() {
    const lottoTickets = this.lottoTickets;
    const profit = lottoTickets.reduce((acc, lottoTicket) => acc + WINNING_PRIZE[lottoTicket.totalMatchCount].PRIZE, 0);
    const loss = lottoTickets.length * LOTTO_PRICE;
    const rateOfReturn = getRateOfReturn(profit, loss);

    return rateOfReturn % 1 !== 0 ? Number(rateOfReturn.toFixed(RATE_OF_RETURN_DECIMAL_PLACE)) : rateOfReturn;
  }

  processData(stage) {
    switch (stage) {
      case PURCHASE_AMOUNT_COMPLETED:
        this.lottoTickets = [...Array(this.numOfLotto)].map((v) => new LottoTicket());
        break;
      case WINNING_NUMBER_COMPLETED:
        this.scoreEachTicket();
        this.rateOfReturn = this.getLottoROR();
        break;
      case APP_RESET:
        this.resetStates();
        break;
    }
  }

  notifySubscribers(stage) {
    this.subscribers[stage]?.forEach((subscriber) => subscriber());
  }

  setStates({ stage, numOfLotto, lottoTickets, winningNumber }) {
    this.stage = stage ?? this.stage;
    this.numOfLotto = numOfLotto ?? this.numOfLotto;
    this.lottoTickets = lottoTickets ?? this.lottoTickets;
    this.winningNumber = winningNumber ?? this.winningNumber;

    this.processData(stage);
    this.notifySubscribers(stage);
  }

  resetStates() {
    this.stage = APP_INIT;
    this.lottoTickets = [];
    this.winningNumber = {};
    this.rateOfReturn = 0;
  }
}
