const showResultModal = () => {
  const showResultButton = document.querySelector("#result-button-open");
  const resultModal = document.querySelector("#prize-result-modal");

  showResultButton.addEventListener("click", () => {
    resultModal.showModal();
  });
};

export default showResultModal;
