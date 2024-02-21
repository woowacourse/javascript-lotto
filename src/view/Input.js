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
};

export default Input;
