import LottoController from './LottoController';
import InputView from './views/InputView';

const app = {
  async play() {
    const purchaseAmount = await InputView.readPurchaseAmount();
    new LottoController(purchaseAmount).run();
  },
};

app.play();
