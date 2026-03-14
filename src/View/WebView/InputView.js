import Console from "../../utils/Console.js";

export class InputView {
  readPrice(handler) {
    const buyButton = document.querySelector("#buy-button");
    buyButton.addEventListener("click", () => {
      const priceInput = document.querySelector("#price input");
      const price = priceInput.value;

      handler(price);
    });
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
