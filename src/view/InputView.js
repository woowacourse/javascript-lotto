import Console from "../utils/Console.js";
const InputView = {
  async purchaseAmount() {
    await Console.readLineAsync(`> 구입금액을 입력해 주세요.`);
  },
};

export default InputView;
