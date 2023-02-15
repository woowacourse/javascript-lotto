import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

const LottoGameController = {
  data: {
    price: 0,
    luckyNumbers: [],
    bonusNumber: 0,
  },

  async start() {
    await this.init();
  },

  async init() {
    this.data.price = await InputView.readLottoPrice();
  },
};

export default LottoGameController;
