const lottoTicketSection = document.querySelector("#lotto-ticket-section");
const modal = document.querySelector(".modal");
const winningNumberFormButton = document.querySelector("#result-button");

const winningNumberInput = document.querySelectorAll("input[name=lotto-winning-number]");
const bonusNumber = document.querySelector("#bonus-number");

const purchaseAmountInput = document.querySelector("#purchase-amount");

export const activateClick = () => (winningNumberFormButton.disabled = false);

export const handleModalCloseButtonClick = () => {
  modal.classList.add("none-display");
  activateClick();
};

export const handleRestartButtonClick = () => {
  modal.classList.add("none-display");
  lottoTicketSection.classList.add("none-display");

  [...winningNumberInput].forEach((number) => {
    number.value = null;
  });

  bonusNumber.value = null;
  purchaseAmountInput.value = null;
  activateClick();
};

export const closeModal = () => {
  const modalCloseButton = document.querySelector(".close-button");
  modalCloseButton.addEventListener("click", handleModalCloseButtonClick);
};

export const restartLottoGame = () => {
  const modalRestartButton = document.querySelector("#restart-button");
  modalRestartButton.addEventListener("click", handleRestartButtonClick);
};
