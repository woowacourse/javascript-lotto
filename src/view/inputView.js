import Console from '../utils/Console.js';

class InputView {
  readMoney() {
    Console.readLine('구입금액을 입력해 주세요.', input => {
      Console.print(input);
    });
  }
}

const inputView = new InputView();
inputView.readMoney();