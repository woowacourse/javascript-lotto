import { SELECTOR } from "../utils/constants.js";
import { $, setDisabled } from "../utils/dom.js";

export default class LottoGameView {
  constructor() {
    this.purchaseInfomation = $(SELECTOR.PURCHASE_INFOMATION);
    this.lottoNumberList = $(SELECTOR.LOTTO_NUMBER_LIST);
    this.switchInput = $(SELECTOR.SWITCH_INPUT);
    this.purchaseInput = $(SELECTOR.PURCHASE_INPUT);
    this.purchaseButton = $(SELECTOR.PURCHASE_BUTTON);
    this.winningContainer = $(SELECTOR.WINNING_CONTAINER);
  }

  disablePurchaseForm() {
    setDisabled(this.purchaseInput);
    setDisabled(this.purchaseButton);
  }

  enableSwitch() {
    this.switchInput.removeAttribute("disabled");
  }

  showWinningInput() {
    this.winningContainer.removeAttribute("hidden");
  }

  renderPurchaseInfomation(count) {
    this.purchaseInfomation.innerText = `총 ${count}개를 구매하였습니다.`;
  }

  renderLottoIcons(count) {
    this.lottoNumberList.insertAdjacentHTML("beforeend", `<li>🎟️</li>`.repeat(count));
  }

  renderLottoNumbers(lottos) {
    lottos.forEach(({ numbers }) => {
      this.lottoNumberList.insertAdjacentHTML(
        "beforeend",
        `<li>🎟️<span class="lotto-numbers">${numbers}</span></li>`,
      );
    });
  }

  resetLottoList() {
    this.lottoNumberList.replaceChildren("");
  }
}
