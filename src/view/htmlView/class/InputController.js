import Elements from "../util/Elements";

class InputController {
  static activatePriceInput() {
    const priceInput = Elements.INPUTS.price;
    priceInput.innerText = priceInput.praceholder;
  }

  static deactivatePriceInput() {
    const priceInput = Elements.INPUTS.price;
    priceInput.innerHTML = priceInput.placeholder;
    priceInput.disabled = true;
  }

  static activateWinningLottoInput() {
    const winningLottoInputs = Elements.INPUTS.winningNumbers;
    winningLottoInputs.forEach((input) => {
      input.disabled = false;
      input.value = "";
    });
  }

  static activateBonusNumberInput() {
    const bonusNumberInput = Elements.INPUTS.bonusNumber;
    bonusNumberInput.disabled = false;
    bonusNumberInput.value = "";
  }

  static deactivateWinningLottoInput() {
    const winningLottoInputs = Elements.INPUTS.winningNumbers;
    winningLottoInputs.forEach((input) => (input.disabled = true));
  }

  static deactivateBonusNumberInput() {
    const bonusNumberInput = Elements.INPUTS.bonusNumber;
    bonusNumberInput.disabled = true;
  }
}

export default InputController;
