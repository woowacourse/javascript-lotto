const lottoTicketSection = document.querySelector(".lotto-ticket-section");
const modal = document.querySelector(".modal");
const winningNumberFormButton = document.querySelector("#winning-lotto > button");

const winningNumberInput = document.querySelectorAll("input[name=winning-number]");
const bonusNumber = document.querySelector("input[name=bonus-number]");

const purchaseAmountInput = document.querySelector("#purchase-amount input");

export const activateClick = () => (winningNumberFormButton.disabled = false);

export const closeModal = () => {
  modal.classList.add("hidden");
  activateClick();
};

export const restartGame = () => {
  modal.classList.add("hidden");
  lottoTicketSection.classList.add("hidden");

  [...winningNumberInput].forEach((number) => {
    number.value = null;
  });

  bonusNumber.value = null;
  purchaseAmountInput.value = null;
  activateClick();
};

export const closeModalButton = () => {
  const modalCloseButton = document.querySelector(".close-button");
  modalCloseButton.addEventListener("click", closeModal);
};

export const restartLottoGame = () => {
  const modalRestartButton = document.querySelector(".modal .lotto-button");
  modalRestartButton.addEventListener("click", restartGame);
};
