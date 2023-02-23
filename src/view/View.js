const { $, $$ } = require("../util/Dom");
const { RANK, ID } = require("../constant/Constant");

const View = {
  hiddenWinLottoElements() {
    $(ID.SHOW_LOTTOS_ELEMENT).style.visibility = "hidden";
    $(ID.INPUT_WINLOTTO_ELEMENT).style.visibility = "hidden";
    $(ID.SUBMIT_WINLOTTO_BUTTON).style.visibility = "hidden";
  },

  showWinLottoElements() {
    $(ID.SHOW_LOTTOS_ELEMENT).style.visibility = "visible";
    $(ID.INPUT_WINLOTTO_ELEMENT).style.visibility = "visible";
    $(ID.SUBMIT_WINLOTTO_BUTTON).style.visibility = "visible";
  },

  showLottoTickets(lottos) {
    $(ID.SHOW_LOTTOS_LABEL).innerText = `총 ${lottos.length}개를 구매했습니다.`;

    $(ID.LOTTO_LIST).replaceChildren();
    lottos.forEach((lotto) => {
      const oneLottoFrame = $(ID.DEFAULT_LOTTOTICKET).cloneNode(true);
      oneLottoFrame.style.display = "block";
      oneLottoFrame.querySelector(".lotto-numbers").innerText = `[${lotto.numbers.join(", ")}]`;
      $(ID.LOTTO_LIST).appendChild(oneLottoFrame);
    });
  },

  showGameResult(rankResult, revenue) {
    [RANK.FIRST, RANK.SECOND, RANK.THIRD, RANK.FOURTH, RANK.FIFTH].forEach((rank) => {
      $(`${ID.RESULT_RANK}${rank}`).innerText = `${rankResult[rank]}개`;
    });
    $(ID.RESULT_REVENUE).innerText = `당신의 총 수입률은 ${revenue}%입니다`;
    $(ID.MODAL_PAGE).style.display = "block";
  },
};

module.exports = View;
