import { querySelector, querySelectorAll } from "../util/DOMSelector";

const purchaseAmountInput = querySelector("#purchase-amount");
const winningNumberInputs = querySelectorAll("input[name=lotto-winning-number]");
const bonusNumber = querySelector("#bonus-number");
const lottoTicketSection = querySelector("#lotto-ticket-section");
const modal = querySelector(".modal");
const winningNumberFormButton = querySelector("#result-button");

export const getPurchaseAmount = () => {
  return purchaseAmountInput.value;
};

export const showLottoTicketSection = () => {
  lottoTicketSection.classList.remove("none-display");
};

export const removeLottoTicketSection = () => {
  lottoTicketSection.classList.add("none-display");
};

export const convertInputsToNumber = () => {
  return [...winningNumberInputs].map((number) => Number(number.value));
};

export const getBonusNumber = () => {
  return bonusNumber.value;
};

export const showModal = () => {
  modal.classList.remove("none-display");
  winningNumberFormButton.disabled = true;
};

export const removeModal = () => {
  modal.classList.add("none-display");
  winningNumberFormButton.disabled = false;
};

export const resetInputs = () => {
  [...winningNumberInputs].forEach((number) => {
    number.value = null;
  });

  bonusNumber.value = null;
  purchaseAmountInput.value = null;
};
