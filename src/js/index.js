import LottoController from './lottoController.js';
import InputLottoDatas from './models/inputLottoDatas.js';
import LottoPurchaseInputView from './views/lottoPurchaseInputView.js';
import LottoPurchaseResultView from './views/lottoPurchaseResultView.js';
import UserLottoModalView from './views/userLottoModalView.js';
import UserLottoNumberView from './views/userLottoNumberView.js';

const startLotto = () => {
  const inputLottoDatas = new InputLottoDatas();

  const views = {
    lottoPurchaseInputView: new LottoPurchaseInputView(),
    lottoPurchaseResultView: new LottoPurchaseResultView(),
    userLottoNumberView: new UserLottoNumberView(),
    userLottoModalView: new UserLottoModalView(),
  };

  const lottoController = new LottoController(inputLottoDatas, views);

  lottoController.init();
};

document.addEventListener('DOMContentLoaded', startLotto);
