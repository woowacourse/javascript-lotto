const LottoView = require("../view/LottoView");
const LottoGame = require("../domain/LottoGame");
const Validation = require("../domain/Validation");

const moneyForm = document.getElementById("money_form");
const winContents = document.getElementById("win_contents");
const winNumForm = document.getElementById("winNum_form");
const modal = document.getElementById("modal");
const btnClose = document.getElementById("btn_close");
const btnRestart = document.getElementById("btn_restart");

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
    btnClose.addEventListener("click", () => {
      modal.style.display = "none";
    });
    btnRestart.addEventListener("click", () => {
      window.location.reload();
    });
  },

  lotteryTicket(event, lottoGame) {
    event.preventDefault();

    const winNum = document.getElementsByName("winNum[]");
    const bonusNum = document.getElementsByName("bonusNum")[0];
    const winNumbers = new Array();

    winNum.forEach((winNum) => {
      const num = parseInt(winNum.value, 10);
      winNumbers.push(num);
    });
    const bonusNumber = parseInt(bonusNum.value, 10);

    try {
      Validation.isWrongWinNumber(winNumbers);
      Validation.isWrongBonusNumber(winNumbers, bonusNumber);

      lottoGame.makeWinLotto(winNumbers, bonusNumber);
      const rankResult = lottoGame.calculateRankResult();
      const revenue = lottoGame.calculateRevenueRate(rankResult);

      modal.style.display = "block";
      LottoView.printRankResult(rankResult, revenue);
    } catch (e) {
      bonusNum.value = null;
      winNum.forEach((winNum) => {
        winNum.value = null;
      });
      LottoView.alertErrorMessage(e.message);
      winNumForm.preventDefault();
    }
  },

  purchaseLotto(event, lottoGame) {
    try {
      event.preventDefault();
      const money = document.getElementById("input_money").value;
      Validation.isWrongMoney(money);

      lottoGame.lottos = money;

      LottoView.printLottoConunt(lottoGame.lottoCount);
      LottoView.printLottos(lottoGame.lottos);

      winContents.classList.remove("hidden");
    } catch (e) {
      LottoView.alertErrorMessage(e.message);
      window.location.reload();
    }
  },
};

module.exports = ViewController;
