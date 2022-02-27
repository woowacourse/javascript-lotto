import { $, disableElement, enableElement } from "../utils/dom.js";
import { ELEMENTS } from "../utils/constants.js";

export default class LottoGameView {
  constructor() {
    this.lottoNumberList = $(".lotto-number-list");
  }

  renderPurchaseInfomation(lottoCount) {
    $(".purchase-infomation").innerText = `총 ${lottoCount}개를 구매하였습니다.`;
  }

  renderLottoIcons(lottoCount) {
    this.lottoNumberList.insertAdjacentHTML("beforeend", `<li>🎟️</li>`.repeat(lottoCount));
  }

  onClickSwitch(lottoList, lottoCount) {
    this.resetLottoList();
    this.lottoNumberList.classList.toggle("show-numbers");
    if (this.lottoNumberList.classList.contains("show-numbers")) {
      this.renderLottoNumbers(lottoList);
      return;
    }
    this.renderLottoIcons(lottoCount);
  }

  handleLottoNumber(lottoList, lottoCount) {
    disableElement(ELEMENTS.PURCHASE_INPUT);
    disableElement($(".purchase-button"));
    enableElement($(".switch-input"));

    this.renderPurchaseInfomation(lottoCount);
    this.renderLottoIcons(lottoCount);
    $(".switch-input").addEventListener("click", () => this.onClickSwitch(lottoList, lottoCount));
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
}
