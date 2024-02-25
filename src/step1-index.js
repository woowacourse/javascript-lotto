import { CONFIG_RESTART } from './constants/config';
import InputView from './views/InputView';
import LottoController from './controllers/LottoController';

const app = {
  async play() {
    const purchaseAmount = await InputView.readPurchaseAmount();
    const lottoController = new LottoController(purchaseAmount);
    await lottoController.run();
    const retry = await InputView.readRestart();
    if (retry === CONFIG_RESTART.YES) this.play();
  },
};

app.play();
