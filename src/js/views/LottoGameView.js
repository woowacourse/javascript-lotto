import { SELECTOR } from "../utils/constants.js";
import { $, setDisabled, setEnabled } from "../utils/dom.js";

export default class LottoGameView {
  constructor() {
    this.purchaseInfomation = $(SELECTOR.PURCHASE_INFOMATION);
    this.lottoNumberList = $(SELECTOR.LOTTO_NUMBER_LIST);
    this.switchInput = $(SELECTOR.SWITCH_INPUT);
    this.purchaseInput = $(SELECTOR.PURCHASE_INPUT);
    this.purchaseButton = $(SELECTOR.PURCHASE_BUTTON);
    this.winningContainer = $(SELECTOR.WINNING_CONTAINER);
  }

  resetGameView() {
    this.#enablePurchaseForm();
    this.#disableSwitch();
    this.#resetPurchaseInfomation();
    this.resetLottoList();
    this.#hideWinningInput();
  }

  showGameResult(lottoCount) {
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
    this.winningContainer.removeAttribute("hidden");
  }

  #hideWinningInput() {
    this.winningContainer.setAttribute("hidden", true);
  }

  #resetPurchaseInfomation() {
    this.purchaseInfomation.innerText = `구매한 로또가 없습니다.`;
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
}
