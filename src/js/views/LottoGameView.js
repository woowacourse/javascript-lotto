import View from "./View.js";
import { $, disableElement, enableElement } from "../utils/dom.js";
import { validatePurchaseAmount } from "../utils/validation.js";

export default class LottoGameView extends View {
  constructor() {
    super();

    this.purchaseInput = $(".purchase-input");
    this.lottoNumberList = $(".lotto-number-list");
    this.switchInput = $(".switch-input");
    $(".purchase-form").addEventListener("submit", this.onSubmitPurchaseAmount.bind(this));
  }

  renderPurchaseInfomation(lottoCount) {
    $(".purchase-infomation").innerText = `총 ${lottoCount}개를 구매하였습니다.`;
  }

  renderLottoIcons(lottoCount) {
    this.lottoNumberList.insertAdjacentHTML("beforeend", `<li>🎟️</li>`.repeat(lottoCount));
  }

  manageElement() {
    disableElement(this.purchaseInput);
    disableElement($(".purchase-button"));
    enableElement(this.switchInput);
  }

  handlePurchasedLotto(lottoCount, lottoList) {
    this.manageElement();
    this.renderLottoIcons(lottoCount);
    this.renderPurchaseInfomation(lottoCount);
    this.switchInput.addEventListener("click", () => this.onClickSwitch(lottoList));
  }

  onSubmitPurchaseAmount(e) {
    e.preventDefault();

    const purchaseAmount = Number(this.purchaseInput.value);
    try {
      validatePurchaseAmount(purchaseAmount);
      this.handlers.get("submit").forEach((func) => func(purchaseAmount));
    } catch (error) {
      alert(error);
    }
  }

  renderLottoNumbers(lottoList) {
    lottoList.forEach((numbers) => {
      this.lottoNumberList.insertAdjacentHTML(
        "beforeend",
        `<li>🎟️<span class="lotto-numbers">${numbers}</span></li>`,
      );
    });
  }

  resetLottoList() {
    this.lottoNumberList.replaceChildren("");
  }

  onClickSwitch(lottoList) {
    this.resetLottoList();
    this.lottoNumberList.classList.toggle("show-numbers");
    if (this.lottoNumberList.classList.contains("show-numbers")) {
      this.renderLottoNumbers(lottoList);
      return;
    }
    this.renderLottoIcons(lottoList.length);
  }
}
