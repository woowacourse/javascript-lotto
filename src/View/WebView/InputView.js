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
  async readLottoNumber(handler) {
    const resultButton = document.querySelector("#result-button");
    resultButton.addEventListener("click", () => {
      const winningNumbers = [
        ...document.querySelectorAll("#winning-lottos .ui-pin"),
      ]
        .map((pinElement) => {
          return pinElement.querySelector("input").value;
        })
        .map(Number);

      const bonusNumber = document.querySelector("#bonus-lotto input").value;

      handler(winningNumbers, Number(bonusNumber));
    });
  }
  async readIsRetry(handler) {
    const restartButton = document.querySelector("#restart-button");
    restartButton.addEventListener("click", () => {
      handler();
    });

    const modalCloseButton = document.querySelector("#modal-close-button");
    modalCloseButton.addEventListener("click", () => {
      handler();
    });
  }
}

export default InputView;
