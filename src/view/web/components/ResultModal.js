import DomHelper from "../../../utils/DomHelper.js";
import Constants from "../../../constant/Constants.js";

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

    this.matchElements = {
      MATCH3: this.match3Element,
      MATCH4: this.match4Element,
      MATCH5: this.match5Element,
      MATCH5_BONUS: this.match5BonusElement,
      MATCH6: this.match6Element,
    };

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
    const { RESULT_INDEX } = Constants.LOTTO;

    Object.entries(this.matchElements).forEach(([matchType, element]) => {
      const index = RESULT_INDEX[matchType];
      const count = gameResult[index] || 0;
      element.textContent = `${count}개`;
    });
    this.totalReturnRateElement.textContent = `당신의 총 수익률은 ${earningRate}%입니다.`;

    this.show();
  }

  show() {
    this.resultModal.classList.add("modal-visible");
  }

  hide() {
    this.resultModal.classList.remove("modal-visible");
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
