import readLineAsync from '../view/InputView.js';

class Controller {
  constructor() {
  }

  async start() {
    let condition = true;
    while (condition) {
      const money = await readLineAsync('> 구입금액을 입력해 주세요.');
      const winningNumber = await readLineAsync('> 당첨 번호를 입력해 주세요.');
      const bonus = await readLineAsync('> 보너스 번호를 입력해 주세요.');
      const reStart = await readLineAsync('> 다시 시작하시겠습니까? (y/n)');
      if (reStart.toLowerCase() === 'n') {
        condition = false;
      }
    }
  }
}

export default Controller;
