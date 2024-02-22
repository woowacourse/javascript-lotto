import Console from '../utils/Console';

class InputView {
  static async readPurchaseAmount() {
    return await Console.readLineAsync('> 구입금액을 입력해 주세요.');
  }

  static async readWinningNumber() {
    return await Console.readLineAsync('\n> 당첨 번호를 입력해 주세요. ');
  }

  static async readBonusNumber() {
    return await Console.readLineAsync('\n> 보너스 번호를 입력해 주세요. ');
  }
  static async readRestartOrExit() {
    return await Console.readLineAsync('\n> 다시 시작하시겠습니까? (y/n) ');
  }
}

export default InputView;
