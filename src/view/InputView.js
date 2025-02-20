import Console from "../utils/Console.js";
const InputView = {
  async purchaseAmount() {
    return await Console.readLineAsync(`> 구입금액을 입력해 주세요.`);
  },

  async winningNumbers() {
    return await Console.readLineAsync(`> 당첨 번호를 입력해 주세요.`);
  },

  async bonusNumber() {
    return await Console.readLineAsync(`> 보너스 번호를 입력해 주세요.`);
  },

  async restart() {
    return await Console.readLineAsync(`> 다시 시작하시겠습니까? (y/n)`);
  },
};

export default InputView;
