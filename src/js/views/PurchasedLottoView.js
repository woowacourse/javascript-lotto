import View from "./View.js";
import { $, disableElement, enableElement } from "../utils/dom.js";
import { SHOW_NUMBERS_CLASS } from "../utils/constants.js";

export default class PurchasedLottoView extends View {
  constructor() {
    super();

    this.lottoNumberList = $(".lotto-number-list");
    this.switchInput = $(".switch-input");
    this.switchInput.addEventListener("click", this.#onClickSwitch.bind(this));
  }

  renderPurchasedInfomation(lottoCount) {
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

  toggleLottoNumbers(lottoList) {
    this.#resetLottoList();
    this.lottoNumberList.classList.toggle(SHOW_NUMBERS_CLASS);
    if (this.lottoNumberList.classList.contains(SHOW_NUMBERS_CLASS)) {
      this.renderLottoNumbers(lottoList);
      return;
    }
    this.renderLottoIcons(lottoList.length);
  }

  #onClickSwitch() {
    this.handlers.get("click").forEach((func) => func());
  }

  handlePurchasedLotto(lottoCount) {
    enableElement(this.switchInput);
    this.renderLottoIcons(lottoCount);
    this.renderPurchasedInfomation(lottoCount);
  }

  resetPurchasedLotto() {
    disableElement(this.switchInput);
    this.lottoNumberList.classList.remove(SHOW_NUMBERS_CLASS);
    this.switchInput.checked = false;
    this.#resetLottoList();
  }

  #resetLottoList() {
    this.lottoNumberList.replaceChildren("");
  }
}
