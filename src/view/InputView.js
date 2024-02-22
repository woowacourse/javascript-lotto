import { readLineAsync } from "../utils/console.js";

const InputView = {
  async readMoney() {
    return await readLineAsync("구입금액을 입력해 주세요.");
  },

  async readWinningLottoNumbers() {
    return await readLineAsync("당첨 번호를 입력해 주세요.");
  },

  async readBonusLottoNumber() {
    return await readLineAsync("보너스 번호를 입력해 주세요.");
  },

  async readIsExitGame() {
    return await readLineAsync("다시 시작하시겠습니까? (y/n)");
  },
};

export default InputView;
