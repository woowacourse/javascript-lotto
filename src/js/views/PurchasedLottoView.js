import View from "./View.js";
import { $, enableElement } from "../utils/dom.js";

export default class PurchasedLottoView extends View {
  constructor() {
    super();

    this.lottoNumberList = $(".lotto-number-list");
    this.switchInput = $(".switch-input");
  }

  renderPurchaseInfomation(lottoCount) {
    $(".purchase-infomation").innerText = `총 ${lottoCount}개를 구매하였습니다.`;
  }

  renderLottoIcons(lottoCount) {
    this.lottoNumberList.insertAdjacentHTML("beforeend", `<li>🎟️</li>`.repeat(lottoCount));
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

  handlePurchasedLotto(lottoCount, lottoList) {
    enableElement(this.switchInput);
    this.renderLottoIcons(lottoCount);
    this.renderPurchaseInfomation(lottoCount);
    this.switchInput.addEventListener("click", () => this.onClickSwitch(lottoList));
  }
}
