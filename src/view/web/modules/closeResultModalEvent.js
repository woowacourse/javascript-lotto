const closeResultModal = () => {
  const closeButtons = document.querySelectorAll(".close-button");

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const parent = button.parentNode;

      parent.close();
    });
  });
};

export default closeResultModal;
