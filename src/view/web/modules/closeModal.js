const closeModal = (targetSelector) => {
  const targetModal = document.querySelector(targetSelector);

  targetModal.addEventListener("click", (event) => {
    if (
      event.target.closest(".close-button") ||
      event.target.nodeName === "DIALOG"
    ) {
      targetModal.close();
    }
  });
};

export default closeModal;
