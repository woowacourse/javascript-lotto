import Console from '../utils/Console.js';

const inputView = {
  readMoney() {
    Console.readLine('구입금액을 입력해 주세요.', input => {
      return input;
    });
  },

  readWinningNumber() {
    Console.readLine('당첨 번호를 입력해 주세요. ', input => {
      return input;
    });
  },

  readBonusNumber() {
    Console.readLine('보너스 번호를 입력해 주세요. ', input => {
      return input
    });
  },

  readRestartOrFinish(){
    Console.readLine('> 다시 시작하시겠습니까? (y/n) ', input => {
        return input
      });
  }
};

export default inputView;
