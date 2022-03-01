import Lotto from "../model/Lotto.js";
import { $, disableElement, enableElement } from "../utils/dom.js";
import { validatePurchaseAmount } from "../utils/validation.js";

export default class LottoGameView {
  constructor() {
    this.LottoModel = new Lotto();
    this.purchaseInput = $(".purchase-input");
    this.lottoNumberList = $(".lotto-number-list");
    this.switchInput = $(".switch-input");

    $(".purchase-form").addEventListener("submit", this.onSubmitPurchaseAmount.bind(this));
  }

  renderPurchaseInfomation() {
    $(
      ".purchase-infomation",
    ).innerText = `총 ${this.LottoModel.getLottoCount()}개를 구매하였습니다.`;
  }

  renderLottoIcons() {
    this.lottoNumberList.insertAdjacentHTML(
      "beforeend",
      `<li>🎟️</li>`.repeat(this.LottoModel.getLottoCount()),
    );
  }

  handlePurchasedLotto() {
    this.renderPurchaseInfomation();
    this.renderLottoIcons();
    this.switchInput.addEventListener("click", this.onClickSwitch.bind(this));
  }

  manageElement() {
    disableElement(this.purchaseInput);
    disableElement($(".purchase-button"));
    enableElement(this.switchInput);
  }

  onSubmitPurchaseAmount(e) {
    e.preventDefault();
    const purchaseAmount = Number(this.purchaseInput.value);
    try {
      validatePurchaseAmount(purchaseAmount);
      this.LottoModel.convertLottoCount(purchaseAmount);
      this.LottoModel.generateLottoTicket();
      this.manageElement();
      this.handlePurchasedLotto();
    } catch (error) {
      alert(error);
    }
  }

  renderLottoNumbers() {
    this.LottoModel.getLottoList().forEach((numbers) => {
      this.lottoNumberList.insertAdjacentHTML(
        "beforeend",
        `<li>🎟️<span class="lotto-numbers">${numbers}</span></li>`,
      );
    });
  }

  resetLottoList() {
    this.lottoNumberList.replaceChildren("");
  }

  onClickSwitch() {
    this.resetLottoList();
    this.lottoNumberList.classList.toggle("show-numbers");
    if (this.lottoNumberList.classList.contains("show-numbers")) {
      this.renderLottoNumbers();
      return;
    }
    this.renderLottoIcons();
  }
}
