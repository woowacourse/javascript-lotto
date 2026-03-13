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
        // 구입금액 입력 전 숨겨져 있던 창 숨김해제
        this.view.lottoListSection.classList.remove("hidden");
        this.view.luckyNumbersForm.classList.remove("hidden");

        // 총 구입 갯수 문구 업데이트
        this.view.lottoCountText.innerText = `총 ${lottos.length}개를 구입하셨습니다.`;

        // 로또 목록 출력 형태에 맞춰 HTML 파일에 업데이트
        const lottosHTML = lottos
          .map((lotto) => {
            return `<div class="lotto-ticket">🎟️ ${lotto.getNumbers().join(", ")} </div>`;
          })
          .join("");
        this.view.lottoList.innerHTML = lottosHTML;
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

        const resultHTML = `
          <tr><td>3개</td><td>5,000</td><td>${winningResult.FIFTH}개</td></tr>
          <tr><td>4개</td><td>50,000</td><td>${winningResult.FOURTH}개</td></tr>
          <tr><td>5개</td><td>1,500,000</td><td>${winningResult.THIRD}개</td></tr>
          <tr><td>5개+보너스볼</td><td>30,000,000</td><td>${winningResult.SECOND}개</td></tr>
          <tr><td>6개</td><td>2,000,000,000</td><td>${winningResult.FIRST}개</td></tr>
        `;
        this.view.resultTableBody.innerHTML = resultHTML;
        this.view.profitRateText.innerText = `당신의 총 수익률은 ${profitRate}%입니다.`;

        this.view.resultModal.classList.remove("hidden");
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
