import CustomError from "../CustomError.js";
import { MESSAGES } from "../constants/index.js";

export default class Output {
  static print(message) {
    console.log(message);
  }

  static error(errorMessage) {
    throw new CustomError(errorMessage);
  }

  static lottoResult() {
    this.print(MESSAGES.output.result);
    this.print(MESSAGES.output.divider);
  }

  static printLottoTickets(lottoTickets) {
    this.print(`${lottoTickets.length}개를 구매했습니다.`);
    lottoTickets.forEach((ticket) => {
      this.print(`[${ticket.join(", ")}]`);
    });
  }
}
