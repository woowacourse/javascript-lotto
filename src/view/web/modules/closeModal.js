const closeResultModal = (targetSelector) => {
  const resultModal = document.querySelector(targetSelector);

  resultModal.addEventListener("click", (event) => {
    if (
      event.target.closest(".close-button") ||
      event.target.nodeName === "DIALOG"
    ) {
      resultModal.close();
    }
  });
};

export default closeResultModal;
