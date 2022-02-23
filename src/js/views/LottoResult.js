import { SELECTOR } from "../utils/constants.js";
import { $ } from "../utils/dom.js";

export default class LottoResult {
  constructor() {
    this.purchaseInfomation = $(SELECTOR.PURCHASE_INFOMATION);
    this.lottoNumberList = $(SELECTOR.LOTTO_NUMBER_LIST);
  }

  renderPurchaseInfomation(count) {
    this.purchaseInfomation.innerText = `총 ${count}개를 구매하였습니다.`;
  }

  renderLottoIcons(count) {
    this.lottoNumberList.insertAdjacentHTML("beforeend", `<li>🎟️</li>`.repeat(count));
  }
}
