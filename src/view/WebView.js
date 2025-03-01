import OUTPUT_MESSAGE from "../constants/OUTPUT_MESSAGE.js";
import DomUpdator from "../utils/DomUpdator.js";
import { LOTTO_NUMBER_SPLITER } from "../constants/constant.js";

const WebView = {
  updatePurchaseCount(element, count) {
    DomUpdator.content(element, `총 ${OUTPUT_MESSAGE.PURCHASE_COUNT(count)}`);
  },

  updateLottoPack(element, lottos) {
    lottos.forEach((lotto) => {
      element.innerHTML += `
                <div class="lotto">
                    <img src="ticket.png" alt="로또" width="34px" height="36px" />
                    <span>${lotto.lottoNumbers.join(`${LOTTO_NUMBER_SPLITER} `)}</span>
                </div>
                  `;
    });
  },
};

export default WebView;
