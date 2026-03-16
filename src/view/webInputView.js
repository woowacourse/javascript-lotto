export const getPurchaseAmountInput = () =>
  document.querySelector("#purchase-input-section input").value;

export const getWinningNumbersInput = () =>
  [...document.querySelectorAll("#winning-inputs-div input")].map(
    (element) => element.value,
  );

export const getBonusNumberInput = () =>
  document.querySelector("#winning-bonus-div input").value;
