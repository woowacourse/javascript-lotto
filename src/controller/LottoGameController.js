const { PRICE_UNIT } = require('../constants/constants');

class LottoGameController {
  constructor() {}

  calcalateLottoCount(priceInput) {
    const price = Number(priceInput);
    return Math.floor(price / PRICE_UNIT);
  }
}

module.exports = LottoGameController;
