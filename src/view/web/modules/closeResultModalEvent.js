const closeResultModal = () => {
  const resultModal = document.querySelector(".prize-result-modal");

  resultModal.addEventListener("click", (event) => {
    if (event.target.closest(".close-button")) {
      resultModal.close();
    }
  });
};

export default closeResultModal;
