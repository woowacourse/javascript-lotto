import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import LottoMachine from '../domain/LottoMachine.js';

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
    console.log(LottoMachine.generateLottos(this.data.price));
  },
};

export default LottoGameController;
