import LottoController from './lottoController.js';
import LottoModel from './lottoModel.js';
import LottoPurchaseInputView from './views/lottoPurchaseInputView.js';
import LottoPurchaseResultView from './views/lottoPurchaseResultView.js';
import LottoNumberInputView from './views/lottoNumberInputView.js';

const init = () => {
  const lottoModel = new LottoModel();

  const views = {
    lottoPurchaseInputView: new LottoPurchaseInputView(),
    lottoPurchaseResultView: new LottoPurchaseResultView(),
    lottoNumberInputView: new LottoNumberInputView(),
  };

  // eslint-disable-next-line no-new
  new LottoController(lottoModel, views);
};

document.addEventListener('DOMContentLoaded', init);
