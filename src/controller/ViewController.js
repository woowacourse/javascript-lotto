const LottoView = require("../view/LottoView");
const LottoGame = require("../domain/LottoGame");

const moneyForm = document.getElementById("money_form");
const winContents = document.getElementById("win_contents");
const winNumForm = document.getElementById("winNum_form");

const ViewController = {
  /** @type {LottoGame} */
  lottoGame: undefined,

  play() {
    this.lottoGame = new LottoGame();
    moneyForm.addEventListener("submit", (event) => {
      this.purchaseLotto(event, this.lottoGame);
    });
    winNumForm.addEventListener("submit", (event) => {
      this.lotteryTicket(event, this.lottoGame);
    });
  },

  lotteryTicket(event, lottoGame) {
    event.preventDefault();

    const winNum = document.getElementsByName("winNum[]");
    const bonusNum = document.getElementsByName("bonusNum")[0].value;
    const winNumbers = new Array();

    winNum.forEach((winNum) => {
      const num = parseInt(winNum.value, 10);
      winNumbers.push(num);
    });
    const bonusNumber = parseInt(bonusNum, 10);

    lottoGame.makeWinLotto(winNumbers, bonusNumber);
    const rankResult = lottoGame.calculateRankResult();
    const revenue = lottoGame.calculateRevenueRate(rankResult);

    console.log(rankResult);
    console.log(revenue);
  },

  purchaseLotto(event, lottoGame) {
    event.preventDefault();

    const money = document.getElementById("input_money").value;
    lottoGame.lottos = money;

    LottoView.printLottoConunt(lottoGame.lottoCount);
    LottoView.printLottos(lottoGame.lottos);

    winContents.classList.remove("hidden");
  },
};

module.exports = ViewController;
