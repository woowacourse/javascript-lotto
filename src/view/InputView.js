import readLineAsync from "../utils/ReadLine.js";

const InputView = {
  async inputPurchaseAmount() {
    const input = await readLineAsync("> 구입금액을 입력해 주세요. ");
    return input;
  },

  async inputWinningLottoNumber() {
    const input = await readLineAsync("\n> 당첨 번호를 입력해 주세요. ");
    return input;
  },

  async inputBonusNumber() {
    const input = await readLineAsync("\n> 보너스 번호를 입력해 주세요. ");
    return input;
  },

  async inputRestartGame() {
    const input = await readLineAsync("\n> 다시 시작하시겠습니까? (y/n) ");
    return input;
  },
};

export default InputView;
