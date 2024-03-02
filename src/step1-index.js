import CONFIG from './constants/config.js';
import InputView from './views/InputView.js';
import LottoController from './controllers/LottoController';

const app = {
  async play() {
    const purchaseAmount = await InputView.readPurchaseAmount();
    const lottoController = new LottoController(purchaseAmount);
    await lottoController.run();
    const retry = await InputView.readRestart();
    if (retry === CONFIG.RESTART_YES) this.play();
  },
};

app.play();
