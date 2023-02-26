const { $, $$ } = require("../util/Dom");
const { rankLotto, selectorId } = require("../constant/Constant");

class View {
  #controller;

  constructor(controller) {
    this.#controller = controller;
  }

  hiddenWinLottoElements() {
    $(selectorId.SHOW_LOTTOS_ELEMENT).style.visibility = "hidden";
    $(selectorId.INPUT_WINLOTTO_ELEMENT).style.visibility = "hidden";
    $(selectorId.SUBMIT_WINLOTTO_BUTTON).style.visibility = "hidden";
  }

  showWinLottoElements() {
    $(selectorId.SHOW_LOTTOS_ELEMENT).style.visibility = "visible";
    $(selectorId.INPUT_WINLOTTO_ELEMENT).style.visibility = "visible";
    $(selectorId.SUBMIT_WINLOTTO_BUTTON).style.visibility = "visible";
  }

  onMoneySubmit(submitMoneyForm) {
    $(selectorId.INPUT_MONEY_FORM).onsubmit = (event) => {
      event.preventDefault();

      const money = $(`${selectorId.INPUT_MONEY_FORM} input`).value;
      submitMoneyForm.call(this.#controller, money);
    };
  }

  onWinLottoSubmit(submitWinLottoForm) {
    $(selectorId.INPUT_WINNER_FORM).onsubmit = (event) => {
      event.preventDefault();

      const inputNums = [...document.getElementsByName("winnumbers")].map((input) => input.value);
      const inputBonus = document.getElementsByName("bonusnumber")[0].value;
      const winLotto = [inputNums, inputBonus];
      console.log(winLotto);

      submitWinLottoForm.apply(this.#controller, winLotto);
    };
  }

  showLottoTickets(lottos) {
    $(selectorId.SHOW_LOTTOS_LABEL).innerText = `총 ${lottos.length}개를 구매했습니다.`;

    $(selectorId.LOTTO_LIST).replaceChildren();
    lottos.forEach((lotto) => {
      const oneLottoFrame = $(selectorId.DEFAULT_LOTTOTICKET).cloneNode(true);
      oneLottoFrame.style.display = "block";
      oneLottoFrame.querySelector(".lotto-numbers").innerText = `[${lotto.numbers.join(", ")}]`;
      $(selectorId.LOTTO_LIST).appendChild(oneLottoFrame);
    });
  }

  showGameResult(rankResult, revenue) {
    [rankLotto.FIRST, rankLotto.SECOND, rankLotto.THIRD, rankLotto.FOURTH, rankLotto.FIFTH].forEach((rank) => {
      $(`${selectorId.RESULT_RANK}${rank}`).innerText = `${rankResult[rank]}개`;
    });
    $(selectorId.RESULT_REVENUE).innerText = `당신의 총 수입률은 ${revenue}%입니다`;
    $(selectorId.MODAL_PAGE).style.display = "block";
  }
}

module.exports = View;
