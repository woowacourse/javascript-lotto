const LottoView = require("../view/LottoView");
const LottoGame = require("../domain/LottoGame");

const moneyForm = document.getElementById("money_form");
const win_contents = document.getElementById("win_contents");

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
    win_contents.classList.remove("hidden");
  },
};

module.exports = Controller;
