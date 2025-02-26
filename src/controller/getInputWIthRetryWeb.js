import Input from "../view/InputWithWeb.js";
import validatePrice from "../validation/validatePrice.js";
import validateLotto from "../validation/validateLotto.js";
import validateBonusNumber from "../validation/validateBonusNumber.js";
import Lotto from "../domain/Lotto.js";

export const getPrice = () => {
  const inputElement = document.querySelector(".priceInput");
  const input = inputElement.value;
  return Input.retry(() => {
    validatePrice(Number(input));
    return Number(input);
  });
};
export const getNeededLottoNumbers = () => {
  const winningLotto = Input.retry(() => {
    const inputs = document.querySelectorAll(".winningNumberInput");
    const winningNumbers = Array.from(inputs).map((input) =>
      Number(input.value)
    );
    validateLotto(winningNumbers);
    const winningLotto = new Lotto(winningNumbers);
    return winningLotto;
  });

  const bonusLottoNumber = Input.retry(() => {
    const input = document.querySelector(".bonusNumberInput");
    const bonusNumber = Number(input.value);
    validateBonusNumber({
      enterdLottoNumbers: winningLotto.getLottoNumbers(),
      bonusLottoNumber: bonusNumber,
    });
    return bonusNumber;
  });

  return { winningLotto, bonusLottoNumber };
};
