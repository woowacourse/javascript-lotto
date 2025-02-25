const showResultModal = () => {
  const showResultButton = document.getElementById("result-button-open");
  const resultModal = document.getElementById("prize-result-modal");

  showResultButton.addEventListener("click", () => {
    resultModal.showModal();
  });
};

export default showResultModal;
