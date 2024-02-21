import Console from '../utils/Console';

const Input = {
  async readMoney() {
    const input = await Console.readLineAsync('구입 금액을 입력해 주세요.');
    return input;
  },
};

export default Input;
