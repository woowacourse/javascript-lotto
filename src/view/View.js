const { $, $$ } = require("../util/Dom");
const { rankLotto, selectorId } = require("../constant/Constant");

const View = {
  hiddenWinLottoElements() {
    $(selectorId.SHOW_LOTTOS_ELEMENT).style.visibility = "hidden";
    $(selectorId.INPUT_WINLOTTO_ELEMENT).style.visibility = "hidden";
    $(selectorId.SUBMIT_WINLOTTO_BUTTON).style.visibility = "hidden";
  },

  showWinLottoElements() {
    $(selectorId.SHOW_LOTTOS_ELEMENT).style.visibility = "visible";
    $(selectorId.INPUT_WINLOTTO_ELEMENT).style.visibility = "visible";
    $(selectorId.SUBMIT_WINLOTTO_BUTTON).style.visibility = "visible";
  },

  showLottoTickets(lottos) {
    $(selectorId.SHOW_LOTTOS_LABEL).innerText = `총 ${lottos.length}개를 구매했습니다.`;

    $(selectorId.LOTTO_LIST).replaceChildren();
    lottos.forEach((lotto) => {
      const oneLottoFrame = $(selectorId.DEFAULT_LOTTOTICKET).cloneNode(true);
      oneLottoFrame.style.display = "block";
      oneLottoFrame.querySelector(".lotto-numbers").innerText = `[${lotto.numbers.join(", ")}]`;
      $(selectorId.LOTTO_LIST).appendChild(oneLottoFrame);
    });
  },

  showGameResult(rankResult, revenue) {
    [rankLotto.FIRST, rankLotto.SECOND, rankLotto.THIRD, rankLotto.FOURTH, rankLotto.FIFTH].forEach((rank) => {
      $(`${selectorId.RESULT_RANK}${rank}`).innerText = `${rankResult[rank]}개`;
    });
    $(selectorId.RESULT_REVENUE).innerText = `당신의 총 수입률은 ${revenue}%입니다`;
    $(selectorId.MODAL_PAGE).style.display = "block";
  },
};

module.exports = View;
