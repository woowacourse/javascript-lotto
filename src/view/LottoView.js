const { MESSAGES } = require("../constant/Constant");
const { HTML_ELEMENTS } = require("../constant/ElementConstant");

const LottoView = {
  printLottoCount(lottoCount) {
    HTML_ELEMENTS.BUY_COUNT_TEXT.innerText =
      MESSAGES.total + lottoCount + MESSAGES.printLottoCount;
  },

  printLottos(lottos) {
    const result = lottos
      .map((lotto) => `🎟️ ${lotto.numbers.join(", ")}\n\n`)
      .join("");
    const buyLottos = document.getElementById("buy_lottos");
    buyLottos.innerText = result;
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
