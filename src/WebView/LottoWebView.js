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
}

export default LottoWebView;
