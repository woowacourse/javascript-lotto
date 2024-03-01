import LottoWebApp from "./step2-web/view/LottoWebApp.js";

import LottoResultState from "./step2-web/model/LottoResultState.js";
import LottosState from "./step2-web/model/LottosState.js";

import BoughtLottoBoard from "./step2-web/view/BoughtLottoBoard.js";
import BuyAmountForm from "./step2-web/view/BuyAmountForm.js";
import WinningLottoForm from "./step2-web/view/WinningLottoForm.js";

import { $ } from "./step2-web/utils/selector.js";
import LottoResultModal from "./step2-web/view/LottoResultModal.js";
import IsResultModalOnState from "./step2-web/model/isResultModalOnState.js";
import BuyAmountFormState from "./step2-web/model/BuyAmountFormState.js";
import WinningLottoErrorMessageState from "./step2-web/model/WinningLottoErrorMessageState.js";

const buyAmountFormState = new BuyAmountFormState();
const lottosState = new LottosState();
const winningLottoErrorMessageState = new WinningLottoErrorMessageState();
const lottoResultState = new LottoResultState();
const isResultModalOnState = new IsResultModalOnState();

const buyAmountForm = new BuyAmountForm(
  "buy-amount-form",
  buyAmountFormState,
  lottosState
);
const boughtLottoBoard = new BoughtLottoBoard(
  "bought-lotto-board",
  lottosState
);
const winningLottoForm = new WinningLottoForm({
  targetElementId: "winning-lotto-form",
  lottosState,
  winningLottoErrorMessageState,
  lottoResultState,
  isResultModalOnState,
});
const lottoResultModal = new LottoResultModal({
  targetElementId: "lotto-result-modal",
  lottosState,
  lottoResultState,
  isResultModalOnState,
});

buyAmountFormState.addObserver(buyAmountForm);
lottosState.addObserver(boughtLottoBoard);
lottosState.addObserver(winningLottoForm);
winningLottoErrorMessageState.addObserver(winningLottoForm);
lottoResultState.addObserver(lottoResultModal);
isResultModalOnState.addObserver(lottoResultModal);

new LottoWebApp(
  $("#app"),
  buyAmountForm,
  boughtLottoBoard,
  winningLottoForm,
  lottoResultModal
).init();
