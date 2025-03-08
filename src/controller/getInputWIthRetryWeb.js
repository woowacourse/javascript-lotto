import Input from "../view/InputWithWeb.js";
import validatePrice from "../validation/validatePrice.js";
import validateLotto from "../validation/validateLotto.js";
import validateBonusNumber from "../validation/validateBonusNumber.js";
import Lotto from "../domain/Lotto.js";
import resetInput from "../utils/resetInput.js";

export const getPrice = () => {
  const inputElement = document.querySelector(".price-input__field");
  const input = inputElement.value;
  return Input.retry(() => {
    resetInput(inputElement);
    validatePrice(input);
    return Number(input);
  });
};

export const getNeededLottoNumbers = () => {
  const winningLotto = Input.retry(() => {
    const inputElements = document.querySelectorAll(
      ".purchase-detail__winning-input"
    );
    const winningNumbers = Array.from(inputElements).map(
      (input) => input.value
    );
    validateLotto(winningNumbers);

    const winningLotto = new Lotto(winningNumbers.map(Number));
    return winningLotto;
  });

  if (winningLotto === undefined) return;

  const bonusLottoNumber = Input.retry(() => {
    const inputElement = document.querySelector(
      ".purchase-detail__bonus-input"
    );
    const bonusNumber = inputElement.value;

    validateBonusNumber({
      enterdLottoNumbers: winningLotto.getLottoNumbers(),
      bonusLottoNumber: bonusNumber,
    });
    return Number(bonusNumber);
  });

  return { winningLotto, bonusLottoNumber };
};
