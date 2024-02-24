import { CONFIG } from './constants';
import { InputView } from './views';
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
