import InputView from './views/InputView';
import LottoController from './controllers/LottoController';
import { CONFIG } from './constants';

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
