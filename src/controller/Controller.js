const LottoView = require("../view/LottoView");
const LottoGame = require("../domain/LottoGame");
const Validation = require("../domain/Validation");

const moneyForm = document.getElementById("money_form");

const Controller = {
  /** @type {LottoGame} */
  lottoGame: undefined,
  play() {
    moneyForm.addEventListener("submit", this.purchaseLotto);
  },

  purchaseLotto(event) {
    this.lottoGame = new LottoGame();
    event.preventDefault();
    const money = document.getElementById("input_money").value;
    this.lottoGame.lottos = money;
    LottoView.printLottoConunt(this.lottoGame.lottoCount);
    LottoView.printLottos(this.lottoGame.lottos);
  },
};

module.exports = Controller;
