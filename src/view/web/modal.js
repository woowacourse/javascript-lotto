const modal = {
  openModal() {
    const $modal = document.getElementsByClassName("modalBackground")[0];
    $modal.style.display = "flex";

    const $closeModalButton = document.getElementById("closeModalButton");
    $closeModalButton.addEventListener("click", modal.closeModal);
    $modal.addEventListener("click", modal.closeModalByBackground);

    document.body.classList.add("modalOpen");
  },

  closeModal() {
    const $modalBackground = document.getElementsByClassName("modalBackground")[0];
    $modalBackground.style.display = "none";

    document.body.classList.remove("modalOpen");
  },

  closeModalByBackground(event) {
    if (event.target === event.currentTarget) modal.closeModal();
  },
};

export default modal;
