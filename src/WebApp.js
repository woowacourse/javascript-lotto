import LottoMachine from "./Domain/LottoMachine.js";
import LottoResult from "./Domain/LottoResult.js";
import LuckyNumbers from "./Domain/LuckyNumbers.js";

class WebApp {
  constructor() {
    this.lottos = [];
  }

  run() {
    // DOM 요소 가져오기
    const purchaseForm = document.querySelector("#purchase-price-form");
    const purchaseInput = document.querySelector("#purchase-price");

    const lottoListSection = document.querySelector("#lotto-list-section");
    const lottoCountText = document.querySelector("#lotto-count-text");
    const lottoList = document.querySelector("#lotto-list");

    // 콘솔관련 유틸을 제거하기 위한 재정의
    const generateRandomNumber = () => {
      const nums = new Set();
      while (nums.size < 6) {
        nums.add(Math.floor(Math.random() * 45) + 1);
      }

      return [...nums];
    };

    // 이벤트 리스너 작성
    purchaseForm.addEventListener("submit", (event) => {
      // 브라우저 새로고침 차단
      event.preventDefault();

      try {
        // 로또 가격 읽어오기
        const purchasePriceStr = purchaseInput.value;

        // 가격에 맞추어 로또 발행
        const lottos = LottoMachine.issueLottos(
          purchasePriceStr,
          generateRandomNumber,
        );

        this.lottos = lottos;

        // 불러온 로또를 기반으로 로또 목록 출력 필요
        // 구입금액 입력 전 숨겨져 있던 창 숨김해제
        lottoListSection.classList.remove("hidden");
        luckyNumbersForm.classList.remove("hidden");

        // 총 구입 갯수 문구 업데이트
        lottoCountText.innerText = `총 ${lottos.length}개를 구입하셨습니다.`;

        // 로또 목록 출력 형태에 맞춰 HTML 파일에 업데이트
        const lottosHTML = lottos
          .map((lotto) => {
            return `<div class="lotto-ticket">🎟️ ${lotto.getNumbers().join(", ")} </div>`;
          })
          .join("");
        lottoList.innerHTML = lottosHTML;
      } catch (e) {
        alert(e.message);
      }
    });

    // luckyNumbers 폼 제출 이벤트
    const luckyNumbersForm = document.querySelector("#lucky-numbers-form");
    const winningNumbersInputs = document.querySelectorAll(".winning-number");
    const bonusNumberInput = document.querySelector("input.bonus-number");

    const resultModal = document.querySelector("#result-modal");
    const resultTableBody = document.querySelector("#result-table-body");
    const profitRateText = document.querySelector("#profit-rate-text");

    luckyNumbersForm.addEventListener("submit", (event) => {
      event.preventDefault();

      try {
        const winningNumbers = Array.from(winningNumbersInputs).map((input) =>
          Number(input.value),
        );
        const bonusNumber = bonusNumberInput.value;

        const luckyNumbers = new LuckyNumbers(winningNumbers, bonusNumber);
        const winningResult = LottoResult.calculateWinningResult(
          this.lottos,
          luckyNumbers,
        );

        const purchasePrice = Number(purchaseInput.value);
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
        resultTableBody.innerHTML = resultHTML;
        profitRateText.innerText = `당신의 총 수익률은 ${profitRate}%입니다.`;

        resultModal.classList.remove("hidden");
      } catch (e) {
        alert(e.message);
      }
    });
  }
}

export default WebApp;
