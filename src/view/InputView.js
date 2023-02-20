import Console from '../util/Console';

const InputView = {
  readUserBudget(callback) {
    Console.read('구입금액을 입력해 주세요.', callback);
  },

  readLottoWinningNumber(callback) {
    Console.read('\n당첨 번호를 입력해 주세요.', callback);
  },

  readLottoBonusNumber(callback) {
    Console.read('\n보너스 번호를 입력해 주세요.', callback);
  },

  readRestartCommand(callback) {
    Console.read('다시 시작하시겠습니까? (y/n)', callback);
  },
};

export default InputView;
