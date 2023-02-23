const LottoGame = require("../domain/LottoGame");
const Validation = require("../domain/Validation");
const View = require("../view/View");
const { $, $$ } = require("../util/Dom");
const { ID } = require("../constant/Constant");

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
    $(ID.INPUT_MONEY_FORM).onsubmit = (event) => {
      event.preventDefault();

      const money = $(`${ID.INPUT_MONEY_FORM} input`).value;
      if (!this.validateMoney(money)) return;

      this.#lottoGame.purchaseLottos(money);
      const lottos = this.#lottoGame.lottos;

      View.showWinLottoElements();
      View.showLottoTickets(lottos);
    };
  }

  submitWinLottoForm() {
    $(ID.INPUT_WINNER_FORM).onsubmit = (event) => {
      event.preventDefault();

      const inputNums = [...document.getElementsByName("winnumbers")].map((input) => input.value);
      const inputBonus = document.getElementsByName("bonusnumber")[0].value;
      if (!this.validateWinNumbers(inputNums)) return;
      if (!this.validateWinBonusNumber(inputNums, inputBonus)) return;
      const numbers = inputNums.map((num) => parseInt(num));
      const bonusNumber = parseInt(inputBonus);

      const winLotto = this.#lottoGame.makeWinLotto(numbers, bonusNumber);
      const rankResult = this.#lottoGame.calculateRankResult(this.#lottoGame.lottos, winLotto);
      const revenue = this.#lottoGame.calculateRevenueRate(rankResult, this.#lottoGame.lottos.length);

      View.showGameResult(rankResult, revenue);
    };
  }
  restart() {
    $(ID.RESTART).addEventListener("click", () => {
      location.reload();
    });
  }

  exitModal() {
    $(ID.MODAL_EXIT).addEventListener("click", () => {
      $(ID.MODAL_PAGE).style.display = "none";
    });
  }

  validateMoney(money) {
    try {
      Validation.validateMoney(money);
      return true;
    } catch (e) {
      alert(e.message);
      $(`${ID.INPUT_MONEY_FORM} input`).value = null;
      View.hiddenWinLottoElements();
      return false;
    }
  }

  validateWinNumbers(numbers) {
    try {
      Validation.validateWinNumber(numbers);
      return true;
    } catch (e) {
      alert(e.message);
      $$(`${ID.WINNUMBERS_ELEMENT} input`).forEach((element) => {
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
      $(`${ID.BONUS_ELEMENT} input`).value = null;
      return false;
    }
  }
}

module.exports = LottoController;
