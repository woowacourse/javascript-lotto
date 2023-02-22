const { RANK } = require("../constant/Constant");
const LottoGame = require("../domain/LottoGame");
const Validation = require("../domain/Validation");

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

class LottoController {
  constructor() {
    view.hiddenInputWinLotto();
    $("#show-lotto").style.visibility = "hidden";
    $("#input-winlotto").style.visibility = "hidden";
    $("#submit-winlotto").style.visibility = "hidden";
    const lottoGame = new LottoGame();
    let lottos;

    $("#input-money-form").onsubmit = function (event) {
      event.preventDefault();

      const money = this.money.value;

      lottos = lottoGame.makeLottos(money);
      if (!LottoController.validateMoney(money)) {
        $("#input-money-form input").value = null;
        $("#show-lotto").style.visibility = "hidden";
        $("#input-winlotto").style.visibility = "hidden";
        $("#submit-winlotto").style.visibility = "hidden";

        return;
      }

      $(
        "#show-lotto-label"
      ).innerText = `총 ${lottos.length}개를 구매했습니다.`;
      $("#show-lotto").style.visibility = "visible";
      $("#input-winlotto").style.visibility = "visible";
      $("#submit-winlotto").style.visibility = "visible";

      $("#lottos").replaceChildren();
      lottos.forEach((lotto) => {
        const lottoFrame = $("#lotto-default").cloneNode(true);
        lottoFrame.style.display = "block";
        lottoFrame.querySelector(
          ".lotto-numbers"
        ).innerText = `[${lotto.numbers.join(", ")}]`;
        $("#lottos").appendChild(lottoFrame);
      });
    };

    $("#input-winnumber-form").onsubmit = function (event) {
      event.preventDefault();

      const numbersString = [
        this.num1.value,
        this.num2.value,
        this.num3.value,
        this.num4.value,
        this.num5.value,
        this.num6.value,
      ];
      const bonusNumberStirng = this.bonus.value;
      if (!LottoController.validateWinNumbers(numbersString)) {
        $$("#input-winnumbers-box input").forEach((element) => {
          element.value = null;
        });

        return;
      }
      if (
        !LottoController.validateWinBonusNumber(
          numbersString,
          bonusNumberStirng
        )
      ) {
        $("#input-bonusnumber-box input").value = null;

        return;
      }

      const bonusNumber = parseInt(bonusNumberStirng);
      const numbers = numbersString.map((num) => parseInt(num));
      const winLotto = lottoGame.makeWinLotto(numbers, bonusNumber);

      const rankResult = lottoGame.calculateRankResult(lottos, winLotto);
      const revenue = lottoGame.calculateRevenueRate(rankResult, lottos.length);

      [1, 2, 3, 4, 5].forEach((rank) => {
        $(`#result-rank${rank}`).innerText = `${rankResult[rank]}개`;
      });

      $("#result-revenue").innerText = `당신의 총 수입률은 ${revenue}%입니다`;

      $("#result").style.display = "block";
    };

    $("#restart").addEventListener("click", () => {
      location.reload();
    });

    $("#result-exit").addEventListener("click", () => {
      $("#result").style.display = "none";
    });
  }

  static validateMoney(money) {
    try {
      Validation.validateMoney(money);
      return true;
    } catch (e) {
      alert(e.message);
      return false;
    }
  }

  static validateWinNumbers(numbers) {
    try {
      Validation.validateWinNumber(numbers);
      return true;
    } catch (e) {
      alert(e.message);
      return false;
    }
  }

  static validateWinBonusNumber(numbers, bonusNumber) {
    try {
      Validation.validateBonusNumber(numbers, bonusNumber);
      return true;
    } catch (e) {
      alert(e.message);
      return false;
    }
  }
}

module.exports = LottoController;
