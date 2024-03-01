import { $ } from "../utils/selector.js";

const modal = {
  openModal() {
    const $app = document.getElementById("app");
    const $modal = document.getElementsByClassName("modalBackground")[0];
    $modal.style.display = "flex";

    const $closeModalButton = document.getElementById("closeModalButton");
    $closeModalButton.addEventListener("click", modal.closeModal);
  },

  closeModal() {
    const $modalBackground = document.getElementsByClassName("modalBackground")[0];
    $modalBackground.style.display = "none";
  },
};

export default modal;
