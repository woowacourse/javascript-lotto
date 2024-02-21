import Console from '../utils/Console.js';

class InputView {
  static async readPurchaseAmount() {
    return await Console.readLineAsync('구입금액을 입력해 주세요.');
  }

  static async readWinningNumber() {
    return await Console.readLineAsync('당첨 번호를 입력해 주세요. ');
  }

  static async readBonusNumber() {
    return await Console.readLineAsync('보너스 번호를 입력해 주세요. ');
  }
}

export default InputView;
