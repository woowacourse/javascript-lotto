import readLineAsync from "../utils/ReadLine.js";

const InputView = {
  async inputPurchaseAmount() {
    const input = await readLineAsync("> 구입금액을 입력해 주세요. ");
    return input;
  },

  async inputWinningLottoNumber() {
    const input = await readLineAsync("> 당첨 번호를 입력해 주세요. ");
    return input;
  },

  async inputBonusNumber() {
    const input = await readLineAsync("> 보너스 번호를 입력해 주세요. ");
    return input;
  },
};

export default InputView;
