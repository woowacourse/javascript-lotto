import LottoController from './lottoController.js';
import LottoModel from './models/pruchaseLottoModel.js';
import LottoPurchaseInputView from './views/lottoPurchaseInputView.js';
import LottoPurchaseResultView from './views/lottoPurchaseResultView.js';
import UserLottoNumberView from './views/userLottoNumberView.js';

const startLotto = () => {
  const lottoModel = new LottoModel();

  const views = {
    lottoPurchaseInputView: new LottoPurchaseInputView(),
    lottoPurchaseResultView: new LottoPurchaseResultView(),
    userLottoNumberView: new UserLottoNumberView(),
  };

  const lottoController = new LottoController(lottoModel, views);

  lottoController.init();
};

document.addEventListener('DOMContentLoaded', startLotto);
