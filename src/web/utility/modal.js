import { OUTPUT_MESSAGE } from "../constants/viewMessage.js";

export const modal = {
  createModalContentDiv: function () {
    const modalContentDiv = document.createElement("div");
    modalContentDiv.classList.add("modal-content-div");

    return modalContentDiv;
  },

  createModalCloseBtn: function () {
    const modalCloseBtn = document.createElement("button");
    modalCloseBtn.textContent = OUTPUT_MESSAGE.CLOSE;
    modalCloseBtn.classList.add("modal-close-btn");

    return modalCloseBtn;
  },

  createModalBackgroundSection: function (modalContent) {
    const modalSection = document.createElement("section");
    modalSection.classList.add("modal-section");

    const modalContentDiv = this.createModalContentDiv();
    modalSection.appendChild(modalContentDiv);

    const modalCloseBtn = this.createModalCloseBtn();
    modalContentDiv.appendChild(modalCloseBtn);

    modalContentDiv.appendChild(modalContent);

    return modalSection;
  },
};
