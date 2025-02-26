import Input from "../view/InputWithWeb.js";
import validatePrice from "../validation/validatePrice.js";
import validateLotto from "../validation/validateLotto.js";
import validateBonusNumber from "../validation/validateBonusNumber.js";
import Lotto from "../domain/Lotto.js";
import resetInput from "../event/resetInput.js";

export const getPrice = () => {
  const inputElement = document.querySelector(".priceInput");
  const input = inputElement.value;
  return Input.retry(() => {
    resetInput(inputElement);
    validatePrice(Number(input));
    return Number(input);
  });
};

export const getNeededLottoNumbers = () => {
  const winningLotto = Input.retry(() => {
    const inputElements = document.querySelectorAll(".winningNumberInput");
    const winningNumbers = Array.from(inputElements).map((input) =>
      Number(input.value)
    );
    resetInput(inputElements);
    validateLotto(winningNumbers);
    const winningLotto = new Lotto(winningNumbers);
    return winningLotto;
  });

  const bonusLottoNumber = Input.retry(() => {
    const inputElement = document.querySelector(".bonusNumberInput");
    const bonusNumber = Number(inputElement.value);
    resetInput(inputElement);
    validateBonusNumber({
      enterdLottoNumbers: winningLotto.getLottoNumbers(),
      bonusLottoNumber: bonusNumber,
    });
    return bonusNumber;
  });

  return { winningLotto, bonusLottoNumber };
};
