import Console from '../utils/Console';

const Input = {
  async readMoney() {
    const input = await Console.readLineAsync('구입 금액을 입력해 주세요.');
    return input;
  },

  async readWinningNumbers() {
    const input = await Console.readLineAsync('당첨 번호를 입력해 주세요.');
    return input;
  },

  async readBonusNumber() {
    const input = await Console.readLineAsync('보너스 번호를 입력해 주세요.');
    return input;
  },

  async readRestartOrExit() {
    const input = await Console.readLineAsync('다시 시작하시겠습니까? (y/n)');
    return input;
  },
};

export default Input;
