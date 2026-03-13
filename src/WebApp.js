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

    // 콘솔관련 유틸을 제거하기 위한 재정의
    const generateRandomNumber = () => {
      const nums = new Set();
      while (nums.size < 6) {
        nums.add(Math.floor(Math.random() * 45) + 1);
      }

      return [...nums];
    };

    // 이벤트 리스너 작성
    this.view.purchaseForm.addEventListener("submit", (event) => {
      // 브라우저 새로고침 차단
      event.preventDefault();

      try {
        // 로또 가격 읽어오기
        const purchasePriceStr = this.view.purchaseInput.value;

        // 가격에 맞추어 로또 발행
        const lottos = LottoMachine.issueLottos(
          purchasePriceStr,
          generateRandomNumber,
        );

        this.lottos = lottos;

        // 불러온 로또를 기반으로 로또 목록 출력 필요
        this.view.renderLottos(lottos);

      } catch (e) {
        alert(e.message);
      }
    });

    
    this.view.luckyNumbersForm.addEventListener("submit", (event) => {
      event.preventDefault();

      try {
        const winningNumbers = Array.from(this.view.winningNumbersInputs).map((input) =>
          Number(input.value),
        );
        const bonusNumber = this.view.bonusNumberInput.value;

        const luckyNumbers = new LuckyNumbers(winningNumbers, bonusNumber);
        const winningResult = LottoResult.calculateWinningResult(
          this.lottos,
          luckyNumbers,
        );

        const purchasePrice = Number(this.view.purchaseInput.value);
        const profitRate = LottoResult.calculateProfitRate(
          winningResult,
          purchasePrice,
        );

        this.view.renderResultModal(winningResult, profitRate);
      } catch (e) {
        alert(e.message);
      }
    });

    // 모달 창 닫기 버튼
    this.view.modalCloseButton.addEventListener("click", () => {
      this.view.resultModal.classList.add("hidden");
    });

    // 재시작 버튼
    this.view.restartButton.addEventListener("click", () => {
      this.view.resultModal.classList.add("hidden");
      this.view.luckyNumbersForm.classList.add("hidden");
      this.view.lottoListSection.classList.add("hidden");
      document.querySelector("#lotto-list").innerHTML = "";

      this.lottos = [];
      this.view.purchaseInput.value = "";
      this.view.winningNumbersInputs.forEach(input => {
        input.value = "";
      });
      this.view.bonusNumberInput.value = "";
    });
  }
}

export default WebApp;
