import Console from '../utils/Console.js';

class InputView {
  static async readPurchaseAmount() {
    return await Console.readLineAsync('구입금액을 입력해 주세요.');
  }
}

export default InputView;

const input = await InputView.readPurchaseAmount();
