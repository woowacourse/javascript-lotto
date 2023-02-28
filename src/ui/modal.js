import { removeLottoTicketSection, removeModal, resetInputs } from "../DOM/controller";
import { querySelector } from "../util/DOMSelector";

export const handleModalCloseButtonClick = () => {
  removeModal();
};

export const handleRestartButtonClick = () => {
  removeModal();
  removeLottoTicketSection();
  resetInputs();
};

export const closeModal = () => {
  const modalCloseButton = querySelector(".close-button");
  modalCloseButton.addEventListener("click", handleModalCloseButtonClick);
};

export const restartLottoGame = () => {
  const modalRestartButton = querySelector("#restart-button");
  modalRestartButton.addEventListener("click", handleRestartButtonClick);
};
