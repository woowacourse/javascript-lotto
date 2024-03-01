import LottoWebApp from "./step2-web/view/LottoWebApp.js";

import LottoResultState from "./step2-web/model/LottoResultState.js";
import LottosState from "./step2-web/model/LottosState.js";

import BoughtLottoBoard from "./step2-web/view/BoughtLottoBoard.js";
import BuyAmountForm from "./step2-web/view/BuyAmountForm.js";
import WinningLottoForm from "./step2-web/view/WinningLottoForm.js";

import { $ } from "./step2-web/utils/selector.js";
import LottoResultModal from "./step2-web/view/LottoResultModal.js";
import BuyAmountState from "./step2-web/model/BuyAmountState.js";

const buyAmountState = new BuyAmountState();
const lottosState = new LottosState();
const lottoResultState = new LottoResultState();

const buyAmountFormView = new BuyAmountForm(
  "buy-amount-form",
  buyAmountState,
  lottosState
);
const boughtLottoBoardView = new BoughtLottoBoard(
  "bought-lotto-board",
  lottosState
);
const winningLottoFormView = new WinningLottoForm(
  "winning-lotto-form",
  lottosState,
  lottoResultState
);
const lottoResultModal = new LottoResultModal(
  "lotto-result-modal",
  buyAmountState,
  lottosState,
  lottoResultState
);

buyAmountState.addObserver(buyAmountFormView);
lottosState.addObserver(boughtLottoBoardView);
lottosState.addObserver(winningLottoFormView);
lottoResultState.addObserver(lottoResultModal);

new LottoWebApp(
  $("#app"),
  buyAmountFormView,
  boughtLottoBoardView,
  winningLottoFormView,
  lottoResultModal
).init();
