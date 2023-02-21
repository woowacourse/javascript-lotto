const LottoView = require("../view/LottoView");
const LottoGame = require("../domain/LottoGame");
const moneyForm = document.getElementById("money_form");

const Controller = {
  /** @type {LottoGame} */
  lottoGame: undefined,
  play() {
    this.lottoGame = new LottoGame();
    moneyForm.addEventListener("submit", LottoView.readMoney);
  },
};

module.exports = Controller;

