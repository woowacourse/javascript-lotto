const LottoView = require("../view/LottoView");
const LottoGame = require("../domain/LottoGame");
const Validation = require("../domain/Validation");
const { DECIMAL } = require("../constant/Constant");
const {
  HTML_ELEMENTS,
  ACTION,
  ATTRIBUTE,
} = require("../constant/ElementConstant");

const ViewController = {
  /** @type {LottoGame} */
  lottoGame: undefined,

  play() {
    this.lottoGame = new LottoGame();
    HTML_ELEMENTS.MONEY_FORM.addEventListener(ACTION.SUBMIT, (event) => {
      this.purchaseLotto(event, this.lottoGame);
    });
    HTML_ELEMENTS.WIN_FORM.addEventListener(ACTION.SUBMIT, (event) => {
      this.lotteryTicket(event, this.lottoGame);
    });
    HTML_ELEMENTS.BTN_CLOSE.addEventListener(ACTION.CLICK, () => {
      HTML_ELEMENTS.MODAL.style.display = ATTRIBUTE.NONE;
    });
    HTML_ELEMENTS.BTN_RESTART.addEventListener(ACTION.CLICK, () => {
      window.location.reload();
    });
  },

  purchaseLotto(event, lottoGame) {
    event.preventDefault();
    try {
      lottoGame.lottos = this.readMoney();

      LottoView.showLottoCount(lottoGame.lottoCount);
      LottoView.showLottos(lottoGame.lottos);

      HTML_ELEMENTS.BTN_MONEY.disabled = ATTRIBUTE.TRUE;
      HTML_ELEMENTS.WIN_CONTENTS.hidden = false;
    } catch (e) {
      LottoView.alertErrorMessage(e.message);
      HTML_ELEMENTS.INPUT_MONEY.value = null;
    }
  },

  readMoney() {
    const money = HTML_ELEMENTS.INPUT_MONEY.value;
    Validation.isWrongMoney(money);

    return money;
  },

  lotteryTicket(event, lottoGame) {
    event.preventDefault();

    try {
      const winNumbers = this.readWinNumbers();
      const bonusNumber = this.readBonusNumber(winNumbers);

      lottoGame.makeWinLotto(winNumbers, bonusNumber);
      this.winningTicket();
    } catch (e) {
      HTML_ELEMENTS.WINNUM.forEach((winNum) => {
        winNum.value = null;
      });
      HTML_ELEMENTS.BONUSNUM.value = null;
      LottoView.alertErrorMessage(e.message);
    }
  },

  winningTicket() {
    const rankResult = this.lottoGame.calculateRankResult();
    const revenue = this.lottoGame.calculateRevenueRate(rankResult);

    HTML_ELEMENTS.MODAL.style.display = ATTRIBUTE.BLOCK;
    LottoView.showRankResult(rankResult);
    LottoView.showRevenue(revenue);
  },

  readWinNumbers() {
    const winNumbers = Array.from(HTML_ELEMENTS.WINNUM, (winNum) =>
      parseInt(winNum.value, DECIMAL)
    );

    Validation.isWrongWinNumber(winNumbers);
    return winNumbers;
  },

  readBonusNumber(winNumbers) {
    const bonusNumber = parseInt(HTML_ELEMENTS.BONUSNUM.value, DECIMAL);
    Validation.isWrongBonusNumber(winNumbers, bonusNumber);

    return bonusNumber;
  },
};

module.exports = ViewController;
