class LottoWebView {
  constructor() {
    this.resultButton = document.querySelector(".result_check_button");
    this.restartButton = document.querySelector(".restart");
    this.closeButton = document.querySelector(".close_button");
    this.modal = document.querySelector(".modal_overlay");
    this.purchaseInput = document.querySelector(".purchase_input");
    this.purchaseButton = document.querySelector(".purchase_button");
    this.resultSection = document.querySelector(".result_section");
    this.winningSection = document.querySelector(".winning_number_section");
    this.resultText = document.querySelector(".result_text");
    this.lottoPackContainer = document.querySelector(".lotto_pack");
  }

  updatePurchaseUI(count) {
    this.resultText.textContent = `총 ${count}개를 구매하였습니다.`;
  }

  updateRandomLottoUI(lottoPack) {
    this.lottoPackContainer.innerHTML = "";

    lottoPack.lottos.forEach((lotto) => {
      const lottoElement = document.createElement("div");
      lottoElement.classList.add("lotto");
      lottoElement.innerHTML = `
          <img src="./public/ticket.png" />
          <p class="random_number">${lotto.lottoNumbers.join(", ")}</p>
        `;
      this.lottoPackContainer.appendChild(lottoElement);
    });
  }

  updateResultUI = (winningResult) => {
    const matchCountElements = {
      3: document.getElementById("match_3"),
      4: document.getElementById("match_4"),
      5: document.getElementById("match_5"),
      "5+1": document.getElementById("match_5+1"),
      6: document.getElementById("match_6"),
    };
    Object.entries(matchCountElements).forEach(([key, element]) => {
      element.textContent = `${winningResult[key]}개`;
    });
  };

  updateProfitUI = (profitRate) => {
    const profitResult = document.querySelector(".profit");
    profitResult.textContent = `당신의 총 수익률은 ${profitRate}%입니다.`;
  };

  showResultSections() {
    this.resultSection.style.display = "block";
    this.winningSection.style.display = "block";
  }

  showError(message) {
    window.alert(message);
    this.purchaseInput.value = "";
  }

  showModal() {
    this.modal.style.display = "block";
  }

  closeModal() {
    this.modal.style.display = "none";
  }

  resetInputs() {
    document.querySelectorAll(".winning_number_input").forEach((input) => (input.value = ""));
    document.querySelector(".bonus_number_input").value = "";
  }

  resetAll() {
    this.purchaseInput.value = "";
    document.querySelectorAll(".winning_number_input").forEach((input) => (input.value = ""));
    document.querySelector(".bonus_number_input").value = "";
    this.modal.style.display = "none";
    this.resultSection.style.display = "none";
    this.winningSection.style.display = "none";
  }
}

export default LottoWebView;
