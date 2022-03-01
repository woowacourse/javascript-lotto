import LottoController from './lottoController.js';
import PurchaseLottoModel from './models/purchaseLottoModel.js';
import UserLottoModel from './models/userLottoModel.js';
import LottoPurchaseInputView from './views/lottoPurchaseInputView.js';
import LottoPurchaseResultView from './views/lottoPurchaseResultView.js';
import UserLottoNumberView from './views/userLottoNumberView.js';

const startLotto = () => {
  const model = {
    purchaseLottoModel: new PurchaseLottoModel(),
    userLottoModel: new UserLottoModel(),
  }

  const views = {
    lottoPurchaseInputView: new LottoPurchaseInputView(),
    lottoPurchaseResultView: new LottoPurchaseResultView(),
    userLottoNumberView: new UserLottoNumberView(),
  };

  const lottoController = new LottoController(model, views);

  lottoController.init();
};

document.addEventListener('DOMContentLoaded', startLotto);
