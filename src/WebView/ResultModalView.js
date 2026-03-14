class ResultModalView {
  #modal;
  #closeButton;
  #profit;
  #submitButton;

  constructor() {
    this.#modal = document.querySelector(".result-modal");
    this.#closeButton = document.querySelector(".result-modal__close-btn");
    this.#profit = document.querySelector(".result-modal__profit");
    this.#submitButton = document.querySelector(".result-modal__submit-btn");
  }

  bindCloseButton() {
    this.#closeButton.addEventListener("click", (e) => {
      this.#modal.close();
    });
  }

  bindSubmitButton(successSubmit) {
    this.#submitButton.addEventListener("click", (e) => {
      this.#modal.close();
      successSubmit();
    });
  }

  setProfitRate(profitRate) {
    this.#profit.textContent = `당신의 총 수익률은 ${profitRate}%입니다.`;
  }

  open() {
    this.#modal.showModal();
  }

  close() {
    this.#modal.close();
  }
}

export default ResultModalView;
