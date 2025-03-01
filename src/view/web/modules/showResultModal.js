const showResultModal = (resultModalCreator) => {
  const showResultButton = document.querySelector(".result-button");

  showResultButton.addEventListener("click", () => {
    const isModalRendered = document.querySelector(".prize-result-modal");

    if (!isModalRendered) {
      resultModalCreator();
    }

    document.querySelector(".prize-result-modal").showModal();
  });
};

export default showResultModal;
