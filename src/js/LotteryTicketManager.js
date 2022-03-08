import { ERROR_MESSAGE, LOTTERY_TICKET_PRICE, MAX_NUMBER_PURCHASE } from './constants/constants';
import LotteryTicket from './LotteryTicket';
import { divider } from './utils/util';

export default class LotteryTicketManager {
  #tickets;

  constructor() {
    this.#tickets = [];
  }

  get tickets() { return this.#tickets; }

  initialize() {
    this.#tickets.length = 0;
  }

  purchaseLotteryTicket(charge) {
    const { newTicketCount, remainCharge } = this.calculateForPurchase(charge);
    if ( newTicketCount === 0 ) {
      alert(ERROR_MESSAGE.CAN_NOT_PURCHASE);
    }
    this.generateNewLottos(newTicketCount);
    return { newTicketCount, remainCharge };
  }

  calculateForPurchase(charge) {
    const availableTicketNumber = MAX_NUMBER_PURCHASE - this.#tickets.length;
    const chargeDivideResult = divider(charge, LOTTERY_TICKET_PRICE);
    const newTicketCount = this.calculateNewTicketCount(availableTicketNumber, chargeDivideResult);
    const remainCharge = this.calculateRemainCharge(availableTicketNumber, chargeDivideResult);
    return { newTicketCount, remainCharge };
  }

  calculateNewTicketCount(availableTicketNumber, chargeDivideResult) {
    const { quotient } = chargeDivideResult;
    if ( availableTicketNumber > quotient ) return quotient;
    return availableTicketNumber;
  }

  calculateRemainCharge(availableTicketNumber, chargeDivideResult) {
    const { quotient, remainder } = chargeDivideResult;
    if ( availableTicketNumber > quotient ) return remainder;
    return (quotient - availableTicketNumber) * LOTTERY_TICKET_PRICE + remainder;
  }

  generateNewLottos(count) {
    let currentCount = 0;
    while ( currentCount < count ) {
      this.#tickets.push(new LotteryTicket());
      currentCount += 1;
    }
  }

  checkPurchasedTicketExist() {
    if ( this.#tickets.length === 0 )
      throw new Error(ERROR_MESSAGE.NO_PURCHASED_TICKET);
  }
}
