import { LOTTO_RULE } from "../utils/constants.js";

export default class WebView {
  constructor() {
    this.purchaseInputEl = document.querySelector(".purchase__input");
    this.purchaseFormEl = document.querySelector(".purchase__form");
    this.lottoListWrapperEl = document.querySelector(".issued-lotto__wrapper");

    this.winningBonusFormEl = document.querySelector(".winning-bonus__form");
    this.winningInputEls = document.querySelectorAll(".winning__input");
    this.bonusInputEl = document.querySelector(".bonus__input");
    this.winningBonusBtnEl = document.querySelector(".winning-bonus__button");

    this.winningResultEl = document.querySelector("tbody");
    this.profitRateEl = document.querySelector(".profit-rate");

    this.closeBtnEl = document.querySelector(".modal__icon-wrapper");
    this.restartBtnEl = document.querySelector(".restart-button");
  }

  initModalEvent() {
    this.closeBtnEl.addEventListener("click", () => {
      this.closeWinningModal();
    });
  }

  // 구입 이벤트 바인딩
  bindPurchaseEvent(handler) {
    this.purchaseFormEl.addEventListener("submit", (e) => {
      e.preventDefault();
      this.lottoListWrapperEl.innerHTML = "";

      handler(this.purchaseInputEl.value);
    });
  }

  // 당첨 결과 폼 이벤트 바인딩
  bindWinningResultFormEvent(handler) {
    this.winningBonusBtnEl.addEventListener("click", () => {
      this.winningResultEl.innerHTML = "";

      handler(this.winningInputEls, this.bonusInputEl);
    });
  }

  // 재시작
  initRestartEvent(handler) {
    this.restartBtnEl.addEventListener("click", () => {
      this.closeWinningModal();
      this.resetDom();

      handler();
    });
  }

  // 구매 결과 렌더링
  renderPurchaseResult(lottos, count) {
    this.renderIssuedLottosCount(this.lottoListWrapperEl, count);
    this.renderIssuedLottos(this.lottoListWrapperEl, lottos);
    this.renderWinningBonusForm();
  }

  // 발행된 로또 개수 렌더링
  renderIssuedLottosCount(parentEl, count) {
    parentEl.insertAdjacentHTML(
      "afterbegin",
      `<p class="issued-lotto__count text-body">총 ${count}개를 구매하셨습니다.</p>`
    );
  }

  // 발행된 로또 리스트 렌더링
  renderIssuedLottos(parentEl, lottos) {
    const lottoListEl = document.createElement("ul");
    lottoListEl.className = "issued-lotto__list";
    parentEl.appendChild(lottoListEl);

    lottoListEl.insertAdjacentHTML(
      "beforeend",
      this.createIssuedLottosNode(lottos)
    );
  }

  // 발행된 로또 리스트 노드 생성
  createIssuedLottosNode(lottos) {
    return lottos
      .map(
        (lotto) =>
          `
                <li class="issued-lotto">
                    <span class="issued-lotto__icon-wrapper"> 🎟️ </span>
                    <p>${lotto.getNumbers().join(", ")}</p>
                </li>
        
            `
      )
      .join("");
  }

  // 당첨 번호 및 보너스 번호 DOM 렌더링
  renderWinningBonusForm() {
    this.winningBonusFormEl.classList.remove("hidden");

    const winningInputEl = document.querySelector("#winning-number");
    winningInputEl.focus();
  }

  // 당첨 결과 모달 열기
  openWinningModal({ stats, profitRate }) {
    const body = document.querySelector("body");
    const modalEl = document.querySelector(".modal-root");
    modalEl.showModal();
    body.classList.add("modal-open"); // 스크롤 제한

    const resultHTML = this.createWinningResultNode(stats);
    this.winningResultEl.insertAdjacentHTML("afterbegin", resultHTML);

    this.profitRateEl.textContent = `총 수익률은 ${profitRate}%입니다.`;
  }

  createWinningResultNode(stats) {
    return [
      LOTTO_RULE["3_MATCH"],
      LOTTO_RULE["4_MATCH"],
      LOTTO_RULE["5_MATCH"],
      LOTTO_RULE["5_BONUS_MATCH"],
      LOTTO_RULE["6_MATCH"],
    ]
      .map(
        (matchCount) =>
          `
            <tr class="modal-table__row">
              <td class="modal-table__data">${
                Number(matchCount) ? Number(matchCount) + "개" : matchCount
              }</td>
              <td class="modal-table__data">${stats[
                matchCount
              ].prize.toLocaleString()}</td>
              <td class="modal-table__data">${stats[matchCount].count}개</td>
            </tr>
      `
      )
      .join("");
  }

  // 당첨 결과 모달 닫기
  closeWinningModal() {
    const body = document.querySelector("body");
    const modalEl = document.querySelector(".modal-root");
    modalEl.close();
    body.classList.remove("modal-open"); // 스크롤 제한 해제
  }

  resetDom() {
    this.purchaseInputEl.value = "";
    this.winningInputEls.forEach((el) => (el.value = ""));
    this.bonusInputEl.value = "";

    this.lottoListWrapperEl.innerHTML = "";
    this.winningResultEl.innerHTML = "";
    this.profitRateEl.textContent = "";

    this.lottoListWrapperEl.classList.add("hidden");
    this.winningBonusFormEl.classList.add("hidden");
  }
}
