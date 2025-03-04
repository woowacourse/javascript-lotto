import OUTPUT_MESSAGE from "../constants/OUTPUT_MESSAGE.js";
import DomUpdator from "../utils/DomUpdator.js";
import { LOTTO_NUMBER_SPLITER } from "../constants/constant.js";

const WebView = {
  updatePurchaseCount(element, count) {
    DomUpdator.content(element, `총 ${OUTPUT_MESSAGE.PURCHASE_COUNT(count)}`);
  },

  updateLottoPack(element, lottos) {
    const innerHtml = lottos
      .map(
        (lotto) =>
          `
      <div class="lotto">
        <img src="/ticket.png" alt="로또" width="34px" height="36px" />
        <span>${lotto.lottoNumbers.join(`${LOTTO_NUMBER_SPLITER} `)}</span>
      </div>
      `,
      )
      .join("");
    element.innerHTML = innerHtml;
  },

  updateStatistics(element, winningResult) {
    element.forEach((row) => {
      const price = row.querySelector(".price").textContent;
      const matchedKey = Object.keys(winningResult).find((key) => key.includes(price));
      if (matchedKey) {
        DomUpdator.content(row.querySelector(".user_count"), `${winningResult[matchedKey]}개`);
      }
    });
  },

  updateProfitRate(element, profitRate) {
    DomUpdator.content(element, `당신의 총 수익률은 ${profitRate}%입니다.`);
  },
};

export default WebView;
