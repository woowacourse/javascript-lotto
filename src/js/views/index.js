import LottoMatchResultModalView from './lottoMatchResultModalView.js';
import LottoPurchaseInputView from './lottoPurchaseInputView.js';
import LottoPurchaseResultView from './lottoPurchaseResultView.js';
import LottoWinningNumberInputView from './lottoWinningNumberInputView.js';

const views = {
  lottoPurchaseInputView: new LottoPurchaseInputView(),
  lottoPurchaseResultView: new LottoPurchaseResultView(),
  lottoWinningNumberInputView: new LottoWinningNumberInputView(),
  lottoMatchResultModalView: new LottoMatchResultModalView(),
};

export default views;
