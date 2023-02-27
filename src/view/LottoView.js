const { MESSAGES } = require("../constant/Constant");
const { HTML_ELEMENTS } = require("../constant/ElementConstant");

const LottoView = {
  showLottoCount(lottoCount) {
    HTML_ELEMENTS.BUY_COUNT_TEXT.innerText =
      MESSAGES.total + lottoCount + MESSAGES.printLottoCount;
  },

  showLottos(lottos) {
    const result = lottos
      .map((lotto) => `🎟️ ${lotto.numbers.join(", ")}\n\n`)
      .join("");
    const buyLottos = document.getElementById("buy_lottos");
    buyLottos.innerText = result;
  },

  showRankResult(rankResult) {
    const rankText = [
      HTML_ELEMENTS.FIRST,
      HTML_ELEMENTS.SECOND,
      HTML_ELEMENTS.THIRD,
      HTML_ELEMENTS.FOURTH,
      HTML_ELEMENTS.FIFTH,
    ];

    rankText.forEach((rankText, i) => {
      rankText.innerText = rankResult[i + 1] + MESSAGES.pieces;
    });
  },

  showRevenue(revenue) {
    HTML_ELEMENTS.REVENUE_TEXT.innerText =
      MESSAGES.printRevenue + revenue + MESSAGES.printFinal;
  },

  alertErrorMessage(message) {
    alert(message);
  },
};

module.exports = LottoView;
