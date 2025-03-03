import DomHelper from "../../../utils/DomHelper.js";

export default class ResultModal {
  constructor(onRestart) {
    this.resultModal = DomHelper.querySelector("#resultModal");
    this.match3Element = DomHelper.querySelector("#match-3");
    this.match4Element = DomHelper.querySelector("#match-4");
    this.match5Element = DomHelper.querySelector("#match-5");
    this.match5BonusElement = DomHelper.querySelector("#match-5-bonus");
    this.match6Element = DomHelper.querySelector("#match-6");
    this.totalReturnRateElement = DomHelper.querySelector("#total-return-rate");
    this.restartButton = DomHelper.querySelector("#restart-button");
    this.closeButton = DomHelper.querySelector("#closeModalBtn");
    this.onRestart = onRestart;

    this.init();
  }

  init() {
    this.restartButton.addEventListener("click", this.handleRestart.bind(this));
    this.closeButton?.addEventListener("click", this.handleClose.bind(this));

    if (!this.closeButton) this.addCloseButton();
    document.addEventListener("keydown", this.handleKeyPress.bind(this));
  }

  handleKeyPress(event) {
    if (event.key === "Escape" && this.resultModal.style.display === "flex") {
      this.hide();
    }
  }

  handleRestart() {
    this.hide();
    this.onRestart();
  }

  handleClose() {
    this.hide();
  }

  displayResult(gameResult, earningRate) {
    this.match3Element.textContent = `${gameResult["5"]}개`;
    this.match4Element.textContent = `${gameResult["4"]}개`;
    this.match5Element.textContent = `${gameResult["3"]}개`;
    this.match5BonusElement.textContent = `${gameResult["2"]}개`;
    this.match6Element.textContent = `${gameResult["1"]}개`;
    this.totalReturnRateElement.textContent = `당신의 총 수익률은 ${earningRate}%입니다.`;
    this.resultModal.style.display = "flex";
  }

  show() {
    this.resultModal.style.display = "flex";
  }

  hide() {
    this.resultModal.style.display = "none";
  }

  addCloseButton() {
    const closeBtn = document.createElement("button");
    closeBtn.id = "closeModalBtn";
    closeBtn.textContent = "닫기";
    closeBtn.classList.add("close-button");

    closeBtn.addEventListener("click", () => {
      this.hide();
    });

    const modalHeader =
      this.resultModal.querySelector(".modal-header") || this.resultModal;

    modalHeader.appendChild(closeBtn);

    this.closeButton = closeBtn;
  }
}
