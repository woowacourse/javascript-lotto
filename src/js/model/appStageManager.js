import {
  APP_INIT,
  PURCHASE_AMOUNT_SUBMITTED,
  TICKET_ISSUE_REQUESTED,
  TICKET_ISSUE_COMPLETED,
  WINNING_NUMBER_SUBMITTED,
  RESULT_REQUESTED,
  RESULT_PREPARED,
  APP_RESET,
} from '../constants/appStages.js';

export default class AppStageManager {
  constructor() {
    this.stage = APP_INIT;

    this.subscribers = {
      [PURCHASE_AMOUNT_SUBMITTED]: [],
      [TICKET_ISSUE_REQUESTED]: [],
      [TICKET_ISSUE_COMPLETED]: [],
      [WINNING_NUMBER_SUBMITTED]: [],
      [RESULT_REQUESTED]: [],
      [RESULT_PREPARED]: [],
      [APP_RESET]: [],
    };
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

  setStates({ stage }) {
    this.stage = stage ?? this.stage;
    this.notifySubscribers(stage);
  }
}
