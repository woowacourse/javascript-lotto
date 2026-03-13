class LottoWebView {
  constructor() {
    // DOM 요소 가져오기
    // 구입 폼 관련
    this.purchaseForm = document.querySelector("#purchase-price-form");
    this.purchaseInput = document.querySelector("#purchase-price");

    // 로또 리스트 관련
    this.lottoListSection = document.querySelector("#lotto-list-section");
    this.lottoCountText = document.querySelector("#lotto-count-text");
    this.lottoList = document.querySelector("#lotto-list");

    // 당첨번호 폼 관련
    this.luckyNumbersForm = document.querySelector("#lucky-numbers-form");
    this.winningNumbersInputs = document.querySelectorAll(".winning-number");
    this.bonusNumberInput = document.querySelector("input.bonus-number");

    // 모달 창 관련
    this.resultModal = document.querySelector("#result-modal");
    this.resultTableBody = document.querySelector("#result-table-body");
    this.profitRateText = document.querySelector("#profit-rate-text");
    this.modalCloseButton = document.querySelector("#modal-close-button");
    this.restartButton = document.querySelector("#restart-button");
  }

  // 구입한 로또 목록 렌더링 및 luckyNumbers 입력창 표시
  renderLottos(lottos) {
    // 구입금액 입력 전 숨겨져 있던 창 숨김해제
    this.lottoListSection.classList.remove("hidden");
    this.luckyNumbersForm.classList.remove("hidden");

    // 총 구입 갯수 문구 업데이트
    this.lottoCountText.innerText = `총 ${lottos.length}개를 구입하셨습니다.`;

    // 로또 목록 출력 형태에 맞춰 HTML 파일에 업데이트
    const lottosHTML = lottos
      .map((lotto) => {
        return `<div class="lotto-ticket">🎟️ ${lotto.getNumbers().join(", ")} </div>`;
      })
      .join("");
    this.lottoList.innerHTML = lottosHTML;
  }

  // 당첨 결과 모달창을 렌더링
  renderResultModal(winningResult, profitRate) {
    const resultHTML = `
          <tr><td>3개</td><td>5,000</td><td>${winningResult.FIFTH}개</td></tr>
          <tr><td>4개</td><td>50,000</td><td>${winningResult.FOURTH}개</td></tr>
          <tr><td>5개</td><td>1,500,000</td><td>${winningResult.THIRD}개</td></tr>
          <tr><td>5개+보너스볼</td><td>30,000,000</td><td>${winningResult.SECOND}개</td></tr>
          <tr><td>6개</td><td>2,000,000,000</td><td>${winningResult.FIRST}개</td></tr>
        `;
    this.resultTableBody.innerHTML = resultHTML;
    this.profitRateText.innerText = `당신의 총 수익률은 ${profitRate}%입니다.`;

    this.resultModal.classList.remove("hidden");
  }

  // 모달 창을 닫는 기능
  closeModal() {
    this.resultModal.classList.add("hidden");
  }

  // 로또 다시 시작 기능
  resetView() {
    this.resultModal.classList.add("hidden");
    this.luckyNumbersForm.classList.add("hidden");
    this.lottoListSection.classList.add("hidden");
    this.lottoList.innerHTML = "";

    this.view.purchaseInput.value = "";
    this.view.winningNumbersInputs.forEach((input) => {
      input.value = "";
    });
    this.view.bonusNumberInput.value = "";
  }

  showError(message) {
    alert(message);
  }
}

export default LottoWebView;
