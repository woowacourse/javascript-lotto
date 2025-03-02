import OUTPUT_MESSAGE from "../constant/output.js";
import STRING from "../constant/string.js";
import { WINNING, KEYS } from "../constant/lotto.js";

const OutputView = {
  printLotto(lotto) {
    // console.log(`[${lotto.join(STRING.PRINT_LOTTO_SPLITTER)}]`);
    document.getElementById("generated-lottos").innerHTML += `
    <p>
      <img src="./public/images/ticket.png"/> ${lotto.join(STRING.PRINT_LOTTO_SPLITTER)}
    </p>
  `;
  },

  printWinningDetailTitle() {
    // console.log(OUTPUT_MESSAGE.WINNING_DETAILS_TITLE);
    document.getElementById("winning-stats-modal-title").innerText =
      OUTPUT_MESSAGE.WINNING_DETAILS_TITLE;
  },

  printWinningDetail(winningCount, rankKeys) {
    // rankKeys.forEach((key) => {
    //   console.log(
    //     `${WINNING[key].LABEL} (${WINNING[key].PRIZES.toLocaleString()}원) - ${winningCount[key]}개`,
    //   );
    // });
    rankKeys.forEach((key) => {
      let label = "";
      if (key === KEYS.SECOND) {
        label = `${WINNING[key].LABEL.slice(0, 2)}+${WINNING[key].LABEL.slice(7, 12)}`;
      } else {
        label = WINNING[key].LABEL.slice(0, 2);
      }
      document.getElementById("winning-stats-table-content").innerHTML += `
      <tr>
        <td>${label}</td>
        <td>${WINNING[key].PRIZES.toLocaleString()}</td>
        <td>${winningCount[key]}개</td>
      </tr>
      `;
    });
  },

  printYieldRate(yieldRate) {
    // console.log(`총 수익률은 ${yieldRate}%입니다.\n`);
    document.getElementById("yield-rate").innerText =
      `당신의 총 수익률은 ${yieldRate}%입니다.`;
  },

  printQuantity(quantity) {
    // console.log(`${quantity}${OUTPUT_MESSAGE.QUANTITY}`);
    if (quantity > 0)
      document.getElementById("purchased-count").innerText =
        `총 ${quantity}${OUTPUT_MESSAGE.QUANTITY}`;
  },
};

export default OutputView;
