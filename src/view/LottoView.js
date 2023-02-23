const { MESSAGES } = require("../constant/Constant");
const { ID, ELEMENT } = require("../constant/ElementConstant");
const { CREATE } = require("../util/DOM");

const LottoView = {
  printLottoCount(lottoCount) {
    ID.BUY_COUNT_TEXT.innerText =
      MESSAGES.total + lottoCount + MESSAGES.printLottoCount;
  },

  printLottos(lottos) {
    ID.BUY_LOTTOS.innerHTML = "";
    lottos.forEach((lotto) => {
      const lottoDiv = CREATE(ELEMENT.P);
      lottoDiv.innerText = `🎟️ ${lotto.numbers.join(", ")}`;

      ID.BUY_LOTTOS.appendChild(lottoDiv);
    });
  },

  printRankResult(rankResult) {
    ID.FIRST.innerText = rankResult[1] + MESSAGES.pieces;
    ID.SECOND.innerText = rankResult[2] + MESSAGES.pieces;
    ID.THIRD.innerText = rankResult[3] + MESSAGES.pieces;
    ID.FOURTH.innerText = rankResult[4] + MESSAGES.pieces;
    ID.FIFTH.innerText = rankResult[5] + MESSAGES.pieces;
  },

  printRevenue(revenue) {
    ID.REVENUE_TEXT.innerText =
      MESSAGES.printRevenue + revenue + MESSAGES.printFinal;
  },

  alertErrorMessage(message) {
    alert(message);
  },
};

module.exports = LottoView;
