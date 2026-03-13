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
}

export default LottoWebView;
