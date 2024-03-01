import LottoWebApp from "./step2-web/view/LottoWebApp.js";

import LottoResultState from "./step2-web/model/LottoResultState.js";
import LottosState from "./step2-web/model/LottosState.js";

import BoughtLottoBoard from "./step2-web/view/BoughtLottoBoard.js";
import BuyAmountForm from "./step2-web/view/BuyAmountForm.js";
import WinningLottoForm from "./step2-web/view/WinningLottoForm.js";

import { $ } from "./step2-web/utils/selector.js";
import LottoResultModal from "./step2-web/view/LottoResultModal.js";
import BuyAmountState from "./step2-web/model/BuyAmountState.js";
import IsResultModalOnState from "./step2-web/model/isResultModalOnState.js";

const buyAmountState = new BuyAmountState();
const lottosState = new LottosState();
const lottoResultState = new LottoResultState();
const isResultModalOnState = new IsResultModalOnState();

const buyAmountFormView = new BuyAmountForm(
  "buy-amount-form",
  buyAmountState,
  lottosState
);
const boughtLottoBoardView = new BoughtLottoBoard(
  "bought-lotto-board",
  lottosState
);
const winningLottoFormView = new WinningLottoForm({
  targetElementId: "winning-lotto-form",
  lottosState,
  lottoResultState,
  isResultModalOnState,
});
const lottoResultModalView = new LottoResultModal({
  targetElementId: "lotto-result-modal",
  buyAmountState,
  lottosState,
  lottoResultState,
  isResultModalOnState,
});

buyAmountState.addObserver(buyAmountFormView);
lottosState.addObserver(boughtLottoBoardView);
lottosState.addObserver(winningLottoFormView);
lottoResultState.addObserver(lottoResultModalView);
isResultModalOnState.addObserver(lottoResultModalView);

new LottoWebApp(
  $("#app"),
  buyAmountFormView,
  boughtLottoBoardView,
  winningLottoFormView,
  lottoResultModalView
).init();
