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

const ViewController = {
  /** @type {LottoGame} */
  lottoGame: undefined,

  play() {
    this.lottoGame = new LottoGame();
    ID.MONEY_FORM.addEventListener(ACTION.SUBMIT, (event) => {
      this.purchaseLotto(event, this.lottoGame);
    });
    ID.WINNUM_FORM.addEventListener(ACTION.SUBMIT, (event) => {
      this.lotteryTicket(event, this.lottoGame);
    });
    ID.BTN_CLOSE.addEventListener(ACTION.CLICK, () => {
      ID.MODAL.style.display = ATTRIBUTE.NONE;
    });
    ID.BTN_RESTART.addEventListener(ACTION.CLICK, () => {
      window.location.reload();
    });
  },

  purchaseLotto(event, lottoGame) {
    ID.BTN_MONEY.disabled = ATTRIBUTE.TRUE;
    event.preventDefault();

    lottoGame.lottos = this.readMoney();

    LottoView.printLottoCount(lottoGame.lottoCount);
    LottoView.printLottos(lottoGame.lottos);

    ID.WIN_CONTENTS.classList.remove(CLASS.HIDDEN);
  },

  readMoney() {
    try {
      const money = ID.INPUT_MONEY.value;
      Validation.isWrongMoney(money);

      return money;
    } catch (e) {
      LottoView.alertErrorMessage(e.message);
      window.location.reload();
    }
  },

  lotteryTicket(event, lottoGame) {
    event.preventDefault();

    try {
      const winNumbers = this.readWinNumbers();
      const bonusNumber = this.readBounsNumber(winNumbers);

      lottoGame.makeWinLotto(winNumbers, bonusNumber);
      this.winnigTicket();
    } catch (e) {
      NAME.WINNUM.forEach((winNum) => {
        winNum.value = null;
      });
      NAME.BONUSNUM.value = null;
      LottoView.alertErrorMessage(e.message);
    }
  },

  winnigTicket() {
    const rankResult = this.lottoGame.calculateRankResult();
    const revenue = this.lottoGame.calculateRevenueRate(rankResult);

    ID.MODAL.style.display = ATTRIBUTE.BLOCK;
    LottoView.printRankResult(rankResult);
    LottoView.printRevenue(revenue);
  },

  readWinNumbers() {
    const winNumbers = new Array();

    NAME.WINNUM.forEach((winNum) => {
      const num = parseInt(winNum.value, DECIMAL);
      winNumbers.push(num);
    });

    Validation.isWrongWinNumber(winNumbers);
    return winNumbers;
  },

  readBounsNumber(winNumbers) {
    const bonusNumber = parseInt(NAME.BONUSNUM.value, DECIMAL);
    Validation.isWrongBonusNumber(winNumbers, bonusNumber);

    return bonusNumber;
  },

};

module.exports = ViewController;
