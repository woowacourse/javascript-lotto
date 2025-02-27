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
  } else if (modalOpenStatus === "flex") {
    prizeResultModal.style.display = "none";
  }
};

export { handleModal, allowModalOpen };
