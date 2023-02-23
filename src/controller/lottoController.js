const { RANK } = require("../constant/Constant");
const LottoGame = require("../domain/LottoGame");
const Validation = require("../domain/Validation");
const View = require("../view/View");

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

class LottoController {
  #lottoGame;

  constructor() {
    View.hiddenWinLottoElements();

    this.#lottoGame = new LottoGame();
    this.submitMoneyForm();
    this.submitWinLottoForm();
    this.restart();
    this.exitModal();
  }

  submitMoneyForm() {
    $("#input-money-form").onsubmit = (event) => {
      event.preventDefault();

      const money = $("#input-money-form input").value;
      if (!this.validateMoney(money)) return;

      this.#lottoGame.purchaseLottos(money);
      const lottos = this.#lottoGame.lottos;

      View.showWinLottoElements();
      View.showLottoTickets(lottos);
    };
  }

  submitWinLottoForm() {
    $("#input-winnumber-form").onsubmit = (event) => {
      event.preventDefault();

      const inputNums = [...document.getElementsByName("winnumbers")].map((input) => input.value);
      const inputBonus = document.getElementsByName("bonusnumber")[0].value;

      if (!this.validateWinNumbers(inputNums)) return;
      if (!this.validateWinBonusNumber(inputNums, inputBonus)) return;
      const bonusNumber = parseInt(inputBonus);
      const numbers = inputNums.map((num) => parseInt(num));

      const winLotto = this.#lottoGame.makeWinLotto(numbers, bonusNumber);
      const rankResult = this.#lottoGame.calculateRankResult(this.#lottoGame.lottos, winLotto);
      const revenue = this.#lottoGame.calculateRevenueRate(rankResult, this.#lottoGame.lottos.length);

      View.showGameResult(rankResult, revenue);
    };
  }

  restart() {
    $("#restart").addEventListener("click", () => {
      location.reload();
    });
  }

  exitModal() {
    $("#result-exit").addEventListener("click", () => {
      $("#result").style.display = "none";
    });
  }

  validateMoney(money) {
    try {
      Validation.validateMoney(money);
      return true;
    } catch (e) {
      alert(e.message);
      $("#input-money-form input").value = null;
      this.hiddenWinLottoElements();
      return false;
    }
  }

  validateWinNumbers(numbers) {
    try {
      Validation.validateWinNumber(numbers);
      return true;
    } catch (e) {
      alert(e.message);
      $$("#input-winnumbers-box input").forEach((element) => {
        element.value = null;
      });
      return false;
    }
  }

  validateWinBonusNumber(numbers, bonusNumber) {
    try {
      Validation.validateBonusNumber(numbers, bonusNumber);
      return true;
    } catch (e) {
      alert(e.message);
      $("#input-bonusnumber-box input").value = null;
      return false;
    }
  }
}

module.exports = LottoController;
