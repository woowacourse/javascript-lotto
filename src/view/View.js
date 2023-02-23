const View = {
  hiddenWinLottoElements() {
    $("#show-lotto").style.visibility = "hidden";
    $("#input-winlotto").style.visibility = "hidden";
    $("#submit-winlotto").style.visibility = "hidden";
  },

  showWinLottoElements() {
    $("#show-lotto").style.visibility = "visible";
    $("#input-winlotto").style.visibility = "visible";
    $("#submit-winlotto").style.visibility = "visible";
  },

  showLottoTickets(lottos) {
    $("#show-lotto-label").innerText = `총 ${lottos.length}개를 구매했습니다.`;

    $("#lottos").replaceChildren();
    lottos.forEach((lotto) => {
      const oneLottoFrame = $("#lotto-default").cloneNode(true);
      oneLottoFrame.style.display = "block";
      oneLottoFrame.querySelector(".lotto-numbers").innerText = `[${lotto.numbers.join(", ")}]`;
      $("#lottos").appendChild(oneLottoFrame);
    });
  },

  showGameResult(rankResult, revenue) {
    [RANK.FIRST, RANK.SECOND, RANK.THIRD, RANK.FOURTH, RANK.FIFTH].forEach((rank) => {
      $(`#result-rank${rank}`).innerText = `${rankResult[rank]}개`;
    });
    $("#result-revenue").innerText = `당신의 총 수입률은 ${revenue}%입니다`;
    $("#result").style.display = "block";
  },
};

module.exports = View;
