import Console from '../util/Console';

const InputView = {
  readUserBudget() {
    return Console.read('구입금액을 입력해 주세요.');
  },

  readLottoWinningNumbers() {
    return Console.read('\n당첨 번호를 입력해 주세요.');
  },

  readLottoBonusNumber() {
    return Console.read('\n보너스 번호를 입력해 주세요.');
  },

  readRestartCommand() {
    return Console.read('다시 시작하시겠습니까? (y/n)');
  },
};

export default InputView;
