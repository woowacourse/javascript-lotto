import { getLottoViewElements } from "./LottoViewElements.js";
import { createTicketsHTML, findRankCount, getWinningFocusTarget, getWinningFormValues, normalizeWinningInputValue } from "./LottoViewUtils.js";

class LottoView {
  constructor() {
    // 뷰가 반복해서 쓰는 DOM 참조를 먼저 수집합니다.
    this.#cacheElements();
    // 모달 닫기처럼 뷰 내부에서 끝나는 이벤트는 뷰가 직접 바인딩합니다.
    this.bindModalClose();
    // 당첨 번호 입력값은 뷰 레벨에서 즉시 정제합니다.
    this.bindWinningInputConstraints();
  }

  /* 이벤트 바인딩 */
  bindPurchase(handler) {
    this.$purchaseForm.addEventListener("submit", (event) => {
      event.preventDefault();
      handler(this.#getPurchaseInputValue());
    });
  }

  bindResult(handler) {
    this.$winningForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const { winningNumbers, bonusNumber } = this.#getWinningFormValues();
      handler(winningNumbers, bonusNumber);
    });
  }

  bindModalClose() {
    this.$modalCloseBtn.addEventListener("click", () => this.closeModal());
  }

  bindRestart(handler) {
    this.$restartBtn.addEventListener("click", () => handler());
  }

  /* UI 표현 */
  showError(message) {
    alert(message);
  }

  /* 입력 포커스와 제약 */
  focusPurchaseInput() {
    this.$purchaseInput.focus();
  }

  focusWinningInput() {
    getWinningFocusTarget(this.$winningInputs)?.focus();
  }

  bindWinningInputConstraints() {
    this.$winningInputs.forEach((input) => {
      input.addEventListener("input", ({ target }) => {
        target.value = normalizeWinningInputValue(target.value);
      });
    });
  }

  /* 화면 렌더링 */
  renderLottoTickets(tickets, count) {
    this.#renderPurchaseCount(count);
    this.#renderTicketList(tickets);
    this.#showResultSections();
  }

  renderResultModal(resultData, profitRate) {
    this.#renderMatchCounts(resultData);
    this.$resultProfitRate.textContent = `당신의 총 수익률은 ${profitRate}%입니다.`;
    this.$modalContainer.hidden = false;
  }

  closeModal() {
    this.$modalContainer.hidden = true;
  }

  /* 화면 초기화 */
  resetUI() {
    this.#resetPurchaseInput();
    this.#clearRenderedResult();
    this.#clearWinningInputs();
    this.closeModal();
    this.#hideResultSections();
  }

  /* 내부 helper */
  #cacheElements() {
    Object.assign(this, getLottoViewElements());
  }

  #getPurchaseInputValue() {
    return this.$purchaseInput.value;
  }

  #getWinningFormValues() {
    return getWinningFormValues(this.$winningInputs);
  }

  #renderPurchaseCount(count) {
    this.$resultText.textContent = `총 ${count}개를 구매하였습니다.`;
  }

  #renderTicketList(tickets) {
    this.$resultContainer.innerHTML = createTicketsHTML(tickets);
  }

  #showResultSections() {
    this.$resultSection.hidden = false;
    this.$winningSection.hidden = false;
  }

  #hideResultSections() {
    this.$resultSection.hidden = true;
    this.$winningSection.hidden = true;
  }

  #renderMatchCounts(resultData) {
    this.$matchCountElements.forEach(({ element, matchCount, requireBonus }) => {
      element.textContent = `${findRankCount(resultData, matchCount, requireBonus)}개`;
    });
  }

  #resetPurchaseInput() {
    this.$purchaseInput.value = "";
  }

  #clearRenderedResult() {
    this.$resultContainer.innerHTML = "";
    this.$resultText.textContent = "";
  }

  #clearWinningInputs() {
    this.$winningInputs.forEach((input) => (input.value = ""));
  }
}

export default LottoView;
