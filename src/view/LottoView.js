const { MESSAGES } = require("../constant/Constant");
const { HTML_ELEMENTS, ELEMENT } = require("../constant/ElementConstant");
const { CREATE } = require("../util/DOM");

const LottoView = {
  printLottoCount(lottoCount) {
    HTML_ELEMENTS.BUY_COUNT_TEXT.innerText =
      MESSAGES.total + lottoCount + MESSAGES.printLottoCount;
  },

  printLottos(lottos) {
    HTML_ELEMENTS.BUY_LOTTOS.innerHTML = "";
    lottos.forEach((lotto) => {
      const lottoDiv = CREATE(ELEMENT.P);
      lottoDiv.innerText = `🎟️ ${lotto.numbers.join(", ")}`;

      HTML_ELEMENTS.BUY_LOTTOS.appendChild(lottoDiv);
    });
  },

  printRankResult(rankResult) {
    HTML_ELEMENTS.FIRST.innerText = rankResult[1] + MESSAGES.pieces;
    HTML_ELEMENTS.SECOND.innerText = rankResult[2] + MESSAGES.pieces;
    HTML_ELEMENTS.THIRD.innerText = rankResult[3] + MESSAGES.pieces;
    HTML_ELEMENTS.FOURTH.innerText = rankResult[4] + MESSAGES.pieces;
    HTML_ELEMENTS.FIFTH.innerText = rankResult[5] + MESSAGES.pieces;
  },

  printRevenue(revenue) {
    HTML_ELEMENTS.REVENUE_TEXT.innerText =
      MESSAGES.printRevenue + revenue + MESSAGES.printFinal;
  },

  alertErrorMessage(message) {
    alert(message);
  },
};

module.exports = LottoView;
