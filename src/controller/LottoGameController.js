import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import LottoGame from '../domain/LottoGame.js';
const LottoGameController = {
  props: {
    price: 0,
    luckyNumbers: [],
    bonusNumber: 0,
  },

  async start() {
    await this.init();
  },

  async init() {
    this.props.price = await InputView.readLottoPrice();
    const lottoGame = new LottoGame(this.props.price);
    OutputView.printLottoNumbersList(lottoGame.getLottoNumbersList());
    this.props.luckyNumbers = await InputView.readLuckyNumbers();
    this.props.bonusNumber = await InputView.readBonusNumber();
  },
};

export default LottoGameController;
