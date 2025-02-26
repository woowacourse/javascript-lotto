import { removeModal } from "../util/modalActions.js";

export const Modal = ({ content }) => {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");

  modalContainer.appendChild(ModalBackground());
  modalContainer.appendChild(ModalLayout({ content: content }));

  return modalContainer;
};

const ModalBackground = () => {
  const modalBackground = document.createElement("div");
  modalBackground.classList.add("modal-background");

  modalBackground.addEventListener("click", () => {
    removeModal();
  });

  return modalBackground;
};

const ModalLayout = ({ content }) => {
  const modalContents = document.createElement("div");
  modalContents.classList.add("modal");
  modalContents.appendChild(content);

  return modalContents;
};
