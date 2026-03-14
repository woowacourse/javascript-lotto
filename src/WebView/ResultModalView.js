class ResultModalView {
  #modal;
  #closeButton;
  #tbody;
  #profit;
  #submitButton;

  constructor() {
    this.#modal = document.querySelector(".result-modal");
    this.#closeButton = document.querySelector(".result-modal__close-btn");
    this.#tbody = document.querySelector(".result-modal__tbody");
    this.#profit = document.querySelector(".result-modal__profit");
    this.#submitButton = document.querySelector(".result-modal__submit-btn");
  }

  open() {
    this.#modal.showModal();
  }

  close() {
    this.#modal.close();
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

  renderScore(scoreData) {
    this.#tbody.innerHTML = "";
    const fragment = new DocumentFragment();

    scoreData.forEach(({ matchCount, mustHaveBonus, price, winCount }) => {
      const tr = document.createElement("tr");
      tr.classList.add("result-modal__tr", "body");
      const tdMatchCount = document.createElement("td");
      const tdPrice = document.createElement("td");
      const tdWinCount = document.createElement("td");

      tdMatchCount.className = "result-modal__td";
      tdMatchCount.textContent = `${matchCount}개`;
      if (mustHaveBonus) {
        tdMatchCount.textContent += "+보너스볼";
      }

      tdPrice.className = "result-modal__td";
      tdPrice.textContent = price.toLocaleString();

      tdWinCount.className = "result-modal__td";
      tdWinCount.textContent = `${winCount}개`;

      tr.append(tdMatchCount);
      tr.append(tdPrice);
      tr.append(tdWinCount);

      fragment.prepend(tr);
    });

    this.#tbody.append(fragment);
  }

  renderProfitRate(profitRate) {
    this.#profit.textContent = `당신의 총 수익률은 ${profitRate}%입니다.`;
  }
}

export default ResultModalView;
