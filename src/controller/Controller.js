import readLineAsync from '../view/InputView.js';

class Controller {
  constructor() {
  }

  async start() {
    const money = await readLineAsync('> 구입금액을 입력해 주세요.');
    const winningNumber = await readLineAsync('> 당첨 번호를 입력해 주세요.');
  }
}

export default Controller;
