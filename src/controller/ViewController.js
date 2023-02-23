const LottoView = require("../view/LottoView");
const LottoGame = require("../domain/LottoGame");
const Validation = require("../domain/Validation");
const {
  ID,
  NAME,
  CLASS,
  ACTION,
  ATTRIBUTE,
} = require("../constant/ElementConstant");
const { DECIMAL } = require("../constant/Constant");

const moneyForm = document.getElementById(ID.MONEY_FORM);
const winContents = document.getElementById(ID.WIN_CONTENTS);
const winNumForm = document.getElementById(ID.WINNUM_FORM);
const modal = document.getElementById(ID.MODAL);
const btnClose = document.getElementById(ID.BTN_CLOSE);
const btnRestart = document.getElementById(ID.BTN_RESTART);

const ViewController = {
  /** @type {LottoGame} */
  lottoGame: undefined,

  play() {
    this.lottoGame = new LottoGame();
    moneyForm.addEventListener(ACTION.SUBMIT, (event) => {
      this.purchaseLotto(event, this.lottoGame);
    });
    winNumForm.addEventListener(ACTION.SUBMIT, (event) => {
      this.lotteryTicket(event, this.lottoGame);
    });
    btnClose.addEventListener(ACTION.CLICK, () => {
      modal.style.display = ATTRIBUTE.NONE;
    });
    btnRestart.addEventListener(ACTION.CLICK, () => {
      window.location.reload();
    });
  },

  purchaseLotto(event, lottoGame) {
    const btnMoney = document.getElementById(ID.BTN_MONEY);
    btnMoney.disabled = ATTRIBUTE.TRUE;
    event.preventDefault();

    try {
      const money = document.getElementById(ID.INPUT_MONEY).value;
      Validation.isWrongMoney(money);

      lottoGame.lottos = money;

      LottoView.printLottoCount(lottoGame.lottoCount);
      LottoView.printLottos(lottoGame.lottos);

      winContents.classList.remove(CLASS.HIDDEN);
    } catch (e) {
      LottoView.alertErrorMessage(e.message);
      window.location.reload();
    }
  },

  lotteryTicket(event, lottoGame) {
    event.preventDefault();

    const winNum = document.getElementsByName(NAME.WINNUM);
    const bonusNum = document.getElementsByName(NAME.BONUSNUM)[0];
    const winNumbers = new Array();

    winNum.forEach((winNum) => {
      const num = parseInt(winNum.value, DECIMAL);
      winNumbers.push(num);
    });
    const bonusNumber = parseInt(bonusNum.value, DECIMAL);

    try {
      Validation.isWrongWinNumber(winNumbers);
      Validation.isWrongBonusNumber(winNumbers, bonusNumber);

      lottoGame.makeWinLotto(winNumbers, bonusNumber);
      const rankResult = lottoGame.calculateRankResult();
      const revenue = lottoGame.calculateRevenueRate(rankResult);

      modal.style.display = ATTRIBUTE.BLOCK;
      LottoView.printRankResult(rankResult);
      LottoView.printRevenue(revenue);
    } catch (e) {
      bonusNum.value = null;
      winNum.forEach((winNum) => {
        winNum.value = null;
      });
      LottoView.alertErrorMessage(e.message);
    }
  },
};

module.exports = ViewController;
