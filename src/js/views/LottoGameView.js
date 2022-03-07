import { LOTTO_NUMBER, SELECTOR } from "../utils/constants.js";
import { $, setDisabled, setEnabled, setHidden, setShow } from "../utils/dom.js";

export default class LottoGameView {
  constructor() {
    this.purchaseInfomation = $(SELECTOR.PURCHASE_INFOMATION);
    this.lottoNumberList = $(SELECTOR.LOTTO_NUMBER_LIST);
    this.switchInput = $(SELECTOR.SWITCH_INPUT);
    this.purchaseInput = $(SELECTOR.PURCHASE_INPUT);
    this.purchaseButton = $(SELECTOR.PURCHASE_BUTTON);
    this.bonusNumberInput = $(SELECTOR.BONUS_NUMBER_INPUT);
    this.winningContainer = $(SELECTOR.WINNING_CONTAINER);

    this.winningContainer.addEventListener("keyup", this.#setAutoCursor.bind(this));
  }

  resetGameView() {
    this.#enablePurchaseForm();
    this.#disableSwitch();
    this.#resetPurchaseInfomation();
    this.resetLottoList();
    this.#hideWinningInput();
  }

  showGameView(lottoCount) {
    this.#disablePurchaseForm();
    this.#enableSwitch();
    this.#renderPurchaseInfomation(lottoCount);
    this.renderLottoIcons(lottoCount);
    this.#showWinningInput();
  }

  #disablePurchaseForm() {
    setDisabled(this.purchaseInput);
    setDisabled(this.purchaseButton);
  }

  #enablePurchaseForm() {
    setEnabled(this.purchaseInput);
    setEnabled(this.purchaseButton);
  }

  #disableSwitch() {
    setDisabled(this.switchInput);
  }

  #enableSwitch() {
    setEnabled(this.switchInput);
  }

  #showWinningInput() {
    setShow(this.winningContainer);
  }

  #hideWinningInput() {
    setHidden(this.winningContainer);
  }

  #resetPurchaseInfomation() {
    this.purchaseInfomation.innerText = "구매한 로또가 없습니다.";
  }

  #renderPurchaseInfomation(count) {
    this.purchaseInfomation.innerText = `총 ${count}개를 구매하였습니다.`;
  }

  renderLottoIcons(count) {
    this.lottoNumberList.insertAdjacentHTML("beforeend", `<li>🎟️</li>`.repeat(count));
  }

  renderLottoNumbers(lottos) {
    lottos.forEach((lotto) => {
      this.lottoNumberList.insertAdjacentHTML(
        "beforeend",
        `<li>🎟️<span class="lotto-numbers">${lotto}</span></li>`,
      );
    });
  }

  resetLottoList() {
    this.lottoNumberList.replaceChildren();
  }

  #setAutoCursor({ target }) {
    const { nextElementSibling: nextWinningNumberInput } = target;

    if (target.value.length >= LOTTO_NUMBER.DIGIT_MAX) {
      target.value = target.value.substr(0, LOTTO_NUMBER.DIGIT_MAX);

      if (nextWinningNumberInput) {
        nextWinningNumberInput.focus();
      }
      if (!nextWinningNumberInput) {
        this.bonusNumberInput.focus();
      }
    }
  }
}
