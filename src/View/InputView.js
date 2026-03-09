import console from "../utils/console.js";

export class InputView {
  async readPrice() {
    return await console.readLineAsync("> 구입금액을 입력해 주세요.");
  }
  async readLottoNumbers() {
    return await console.readLineAsync("> 당첨 번호를 입력해 주세요. ");
  }
  async readBonusNumber() {
    return await console.readLineAsync("\n> 보너스 번호를 입력해 주세요. ");
  }
  async readIsRetry() {
    return await console.readLineAsync("\n> 다시 시작하시겠습니까? (y/n) ");
  }
}

export default InputView;
