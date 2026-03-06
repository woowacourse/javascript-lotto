import Console from "../utils/Console.js";

export class InputView {
  async readPrice() {
    return await Console.readLineAsync("> 구입금액을 입력해 주세요.");
  }
  async readLottoNumbers() {
    return await Console.readLineAsync("> 당첨 번호를 입력해 주세요. ");
  }
  async readBonusNumber() {
    return await Console.readLineAsync("\n> 보너스 번호를 입력해 주세요. ");
  }
  async readIsRetry() {
    return await Console.readLineAsync("\n> 다시 시작하시겠습니까? (y/n) ");
  }
}

export default InputView;
