import readLineAsync from '../view/InputView.js';

class Controller {
  constructor() {
  }

  async start() {
    const money = await readLineAsync('구입금액을 입력해주세요');
  }
}

export default Controller;
