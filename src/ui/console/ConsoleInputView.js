import { Console } from "@woowacourse/mission-utils";

const INFO = {
  PURCHASE_AMOUNT: `> 구입금액을 입력해 주세요.`,
  WINNING_LOTTO_NUMBER: `> 당첨 번호를 입력해 주세요. `,
  WINNING_BONUS_NUMBER: `> 보너스 번호를 입력해 주세요. `,
  ASK_RETRY: `> 다시 시작하시겠습니까? (y/n) `,
};

class ConsoleInputView {
  static async readPurchaseAmount() {
    return await Console.readLineAsync(INFO.PURCHASE_AMOUNT);
  }

  static async readWinningLottoNumber() {
    return await Console.readLineAsync(INFO.WINNING_LOTTO_NUMBER);
  }

  static async readWinningBonusNumber() {
    return await Console.readLineAsync(INFO.WINNING_BONUS_NUMBER);
  }

  static async readAskRetry() {
    return await Console.readLineAsync(INFO.ASK_RETRY);
  }
}

export default ConsoleInputView;
