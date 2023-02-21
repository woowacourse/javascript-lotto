const { PRICE_UNIT } = require('../constants/constants');
const Lottos = require('../domain/model/Lottos');
const exception = require('../utils/exception');
const inputView = require('../view/inputView');
const outputView = require('../view/outputView');

class LottoGameController {
  #lottos;

  #winningLotto;

  constructor() {
    inputView.setPurchasePriceInputHandler(this.handlePurchasePriceInput);
  }

  handlePurchasePriceInput = (input) => {
    try {
      const lottoCount = this.calculateLottoCount(input);
      this.#lottos = new Lottos(lottoCount);
      this.showPurchasedLottos();
    } catch (error) {
      alert(error.message);
    }
  };

  showPurchasedLottos() {
    outputView.renderPurchasedLottos(this.#lottos.getLottos());
    outputView.renderWinningNumbersInput();
  }

  calculateLottoCount(priceInput) {
    exception.checkPurchasePrice(priceInput);

    const price = Number(priceInput);

    return Math.floor(price / PRICE_UNIT);
  }
}

module.exports = LottoGameController;
