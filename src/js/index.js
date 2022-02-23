import LottoController from './lottoController.js';
import LottoModel from './lottoModel.js';
import LottoPurchaseInputView from './views/lottoPurchaseInputView.js';
import LottoPurchaseResultView from './views/lottoPurchaseResultView.js';
import LottoNumberInputView from './views/lottoNumberInputView.js';

const startLotto = () => {
  const lottoModel = new LottoModel();

  const views = {
    lottoPurchaseInputView: new LottoPurchaseInputView(),
    lottoPurchaseResultView: new LottoPurchaseResultView(),
    lottoNumberInputView: new LottoNumberInputView(),
  };

  const lottoController = new LottoController(lottoModel, views);

  lottoController.init();
};

document.addEventListener('DOMContentLoaded', startLotto);
