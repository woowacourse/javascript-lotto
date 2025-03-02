import { hideLayout, showLayout } from "./setup";

const allowModalOpen = () => {
  const prizeResultModal = document.querySelector("modal");
  showLayout(prizeResultModal);

  const prizeResultButton = document.querySelector(".result-contents");
  const closeButton = document.querySelector("modal .close-button");

  prizeResultButton.addEventListener("click", handleModal);
  closeButton.addEventListener("click", handleModal);
  document.body.style.overflow = "hidden";
};

const handleModal = () => {
  const prizeResultModal = document.querySelector("modal");
  const modalOpenStatus = window.getComputedStyle(prizeResultModal).visibility;

  if (modalOpenStatus === "hidden") {
    showLayout(prizeResultModal);
    document.body.style.overflow = "hidden";
  } else if (modalOpenStatus === "visible") {
    hideLayout(prizeResultModal);
    document.body.style.overflow = "auto";
  }
};

const allowWinningLotto = () => {
  const winningLottoContainer = document.querySelector(
    ".winningLotto-contents"
  );
  const resultSubmitButton = document.querySelector(".result-contents");

  showLayout(winningLottoContainer);
  showLayout(resultSubmitButton);
};

export { handleModal, allowModalOpen, allowWinningLotto };
