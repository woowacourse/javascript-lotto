import { PRIZE, RANK_MAP_WEB } from "../Utils/Constants";

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
    this.#show(this.lottoListSection);
    this.#show(this.luckyNumbersForm);

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
    // 출력할 등수 순서
    const rankOrder = ["FIFTH", "FOURTH", "THIRD", "SECOND", "FIRST"];

    const resultHTML = rankOrder
      .map((rank) => {
        const matchText = RANK_MAP_WEB[rank];
        const prizeMoney = PRIZE[rank].toLocaleString();
        const count = winningResult[rank];

        return `<tr><td>${matchText}</td><td>${prizeMoney}</td><td>${count}개</td></tr>`;
      })
      .join("");

    this.resultTableBody.innerHTML = resultHTML;
    this.profitRateText.innerText = `당신의 총 수익률은 ${profitRate}%입니다.`;

    this.#show(this.resultModal);
  }

  // 모달 창을 닫는 기능
  closeModal() {
    this.#hide(this.resultModal);
  }

  // 로또 다시 시작 기능
  resetView() {
    this.#hide(this.resultModal);
    this.#hide(this.luckyNumbersForm);
    this.#hide(this.lottoListSection);

    this.lottoList.innerHTML = "";
    this.purchaseInput.value = "";
    this.winningNumbersInputs.forEach((input) => {
      input.value = "";
    });
    this.bonusNumberInput.value = "";
  }

  showError(message) {
    alert(message);
  }

  // 이벤트 바인딩 관련
  // 구입 폼 제출
  bindPurchaseForm(handler) {
    this.purchaseForm.addEventListener("submit", (event) => {
      // 브라우저 새로고침 차단
      event.preventDefault();

      handler(this.purchaseInput.value);
    });
  }

  // luckyNumbers 폼 제출
  bindLuckyNumbersForm(handler) {
    this.luckyNumbersForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const winningNumbers = Array.from(this.winningNumbersInputs).map(
        (input) => Number(input.value),
      );
      const bonusNumber = this.bonusNumberInput.value;

      handler(winningNumbers, bonusNumber);
    });
  }

  // 모달 창 닫기 버튼
  bindModalCloseButton(handler) {
    this.modalCloseButton.addEventListener("click", () => {
      handler();
    });
  }

  // 재시작 버튼
  bindRestartButton(handler) {
    this.restartButton.addEventListener("click", () => {
      handler();
    });
  }

  // hidden 속성을 가진 박스를 화면에 표시
  #show(element) {
    element.classList.remove("hidden");
  }

  // hidden 속성을 가진 박스를 화면에서 숨김
  #hide(element) {
    element.classList.add("hidden");
  }
}

export default LottoWebView;
