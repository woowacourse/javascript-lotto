const { MESSAGES } = require("../constant/Constant");
const { ID, ELEMENT } = require("../constant/ElementConstant");

const LottoView = {
  printLottoCount(lottoCount) {
    const buyCountText = document.getElementById(ID.BUY_COUNT_TEXT);
    buyCountText.innerText =
      MESSAGES.total + lottoCount + MESSAGES.printLottoCount;
  },

  printLottos(lottos) {
    const buyLottos = document.getElementById(ID.BUY_LOTTOS);
    buyLottos.innerHTML = "";
    lottos.forEach((lotto) => {
      const lottoDiv = document.createElement(ELEMENT.P);
      lottoDiv.innerText = `🎟️ ${lotto.numbers.join(", ")}`;

      buyLottos.appendChild(lottoDiv);
    });
  },

  printRankResult(rankResult) {
    const first = document.getElementById(ID.FIRST);
    const second = document.getElementById(ID.SECOND);
    const third = document.getElementById(ID.THIRD);
    const fourth = document.getElementById(ID.FOURTH);
    const fifth = document.getElementById(ID.FIFTH);

    first.innerText = rankResult[1] + MESSAGES.pieces;
    second.innerText = rankResult[2] + MESSAGES.pieces;
    third.innerText = rankResult[3] + MESSAGES.pieces;
    fourth.innerText = rankResult[4] + MESSAGES.pieces;
    fifth.innerText = rankResult[5] + MESSAGES.pieces;
  },

  printRevenue(revenue) {
    const revenueText = document.getElementById(ID.REVENUE_TEXT);
    revenueText.innerText =
      MESSAGES.printRevenue + revenue + MESSAGES.printFinal;
  },

  alertErrorMessage(message) {
    alert(message);
  },
};

module.exports = LottoView;
