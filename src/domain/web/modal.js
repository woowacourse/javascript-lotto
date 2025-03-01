const allowModalOpen = () => {
  const prizeResultModal = document.querySelector("modal");
  prizeResultModal.style.display = "flex";

  const prizeResultButton = document.querySelector(".result-contents");
  const closeButton = document.querySelector("modal .close-button");

  prizeResultButton.addEventListener("click", handleModal);
  closeButton.addEventListener("click", handleModal);
};

const handleModal = () => {
  const prizeResultModal = document.querySelector("modal");
  const modalOpenStatus = window.getComputedStyle(prizeResultModal).display;

  if (modalOpenStatus === "none") {
    prizeResultModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  } else if (modalOpenStatus === "flex") {
    prizeResultModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
};

const allowWinningLotto = () => {
  const winningLottoContainer = document.querySelector(
    ".winningLotto-contents"
  );
  const resultSubmitButton = document.querySelector(".result-contents");

  winningLottoContainer.style.display = "flex";
  resultSubmitButton.style.display = "flex";
  document.body.style.overflow = "hidden";
};

export { handleModal, allowModalOpen, allowWinningLotto };
