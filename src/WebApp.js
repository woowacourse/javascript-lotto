import LottoMachine from "./Domain/LottoMachine.js";
import LottoResult from "./Domain/LottoResult.js";
import LuckyNumbers from "./Domain/LuckyNumbers.js";
import LottoWebView from "./WebView/LottoWebView.js";

class WebApp {
  constructor() {
    this.lottos = [];
    this.view = new LottoWebView();
  }

  run() {
    // 구입 폼 관련
    this.view.bindPurchaseForm(this.#handlePurchaseForm.bind(this));
    // luckyNumbers 폼 관련
    this.view.bindLuckyNumbersForm(this.#handleLuckyNumbersForm.bind(this));
    // 모달 창 닫기 버튼
    this.view.bindModalCloseButton(this.#handleModalCloseButton.bind(this));
    // 재시작 버튼
    this.view.bindRestartButton(this.#handleRestartButton.bind(this));
  }

  // 랜덤 숫자 생성기
  #generateRandomNumber() {
    const nums = new Set();
    while (nums.size < 6) {
      nums.add(Math.floor(Math.random() * 45) + 1);
    }

    return [...nums];
  }

  // 구입 폼 관련
  #handlePurchaseForm(purchasePriceStr) {
    try {
      // 가격에 맞추어 로또 발행
      const lottos = LottoMachine.issueLottos(
        purchasePriceStr,
        this.#generateRandomNumber,
      );

      this.lottos = lottos;

      // 불러온 로또를 기반으로 로또 목록 출력 필요
      this.view.renderLottos(lottos);
    } catch (e) {
      this.view.showError(e.message);
    }
  }

  #handleLuckyNumbersForm(winningNumbers, bonusNumber) {
    try {
      const luckyNumbers = new LuckyNumbers(winningNumbers, bonusNumber);
      const winningResult = LottoResult.calculateWinningResult(
        this.lottos,
        luckyNumbers,
      );

      const purchasePrice = this.lottos.length * 1000;
      const profitRate = LottoResult.calculateProfitRate(
        winningResult,
        purchasePrice,
      );

      this.view.renderResultModal(winningResult, profitRate);
    } catch (e) {
      this.view.showError(e.message);
    }
  }

  #handleModalCloseButton() {
    this.view.closeModal();
  }

  #handleRestartButton() {
    this.lottos = [];
    this.view.resetView();
  }
}

export default WebApp;
