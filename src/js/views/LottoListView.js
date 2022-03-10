import { $ } from "../utils/dom.js";
import { SELECTOR } from "../utils/constants.js";
import { setEnabled, setDisabled } from "../utils/dom";

export default class LottoListView {
  constructor() {
    this.switchInput = $(SELECTOR.SWITCH_INPUT);
    this.lottoNumberList = $(SELECTOR.LOTTO_NUMBER_LIST);
  }

  bindSwitch(handler) {
    this.switchInput.addEventListener("click", handler);
  }

  disableSwitch() {
    setDisabled(this.switchInput);
  }

  enableSwitch() {
    setEnabled(this.switchInput);
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
