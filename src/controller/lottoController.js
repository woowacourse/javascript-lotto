const LottoGame = require("../domain/LottoGame");
const InputView = require("../view/inputView");
const OutputView = require("../view/outputView");

const LottoController = {
  async playLotto() {
    const lottoCount = parseInt((await this.readMoney()) / 1000);
    OutputView.printLottoCount(lottoCount);
    LottoGame.makeLottos(lottoCount);
    OutputView.printPurchaseLottos(LottoGame.lottos);
  },

  async readMoney() {
    try {
      const money = await InputView.readMoney();
      if (!this.validateMoney(money)) throw new Error();
      return money;
    } catch (e) {
      this.inputMoeny();
    }
  },

  validateMoney(money) {
    return money > 0 && money % 1000 === 0;
  },
};

module.exports = LottoController;
