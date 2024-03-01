import MainComponent from "./step2-web/view/MainComponent.js";

import LottoResultState from "./step2-web/model/LottoResultState.js";
import LottosState from "./step2-web/model/LottosState.js";

import BoughtLottoBoard from "./step2-web/view/BoughtLottoBoard.js";
import BuyAmountForm from "./step2-web/view/BuyAmountForm.js";
import WinningLottoForm from "./step2-web/view/WinningLottoForm.js";

import { $ } from "./step2-web/utils/selector.js";
import LottoResultModal from "./step2-web/view/LottoResultModal.js";
import IsResultModalOnState from "./step2-web/model/isResultModalOnState.js";

const lottosState = new LottosState();
const lottoResultState = new LottoResultState();
const isResultModalOnState = new IsResultModalOnState();

const buyAmountForm = new BuyAmountForm("buy-amount-form", lottosState);
const boughtLottoBoard = new BoughtLottoBoard(
  "bought-lotto-board",
  lottosState
);
const winningLottoForm = new WinningLottoForm({
  targetElementId: "winning-lotto-form",
  lottosState,
  lottoResultState,
  isResultModalOnState,
});
const lottoResultModal = new LottoResultModal({
  targetElementId: "lotto-result-modal",
  lottosState,
  lottoResultState,
  isResultModalOnState,
});

lottosState.addObserver(buyAmountForm);
lottosState.addObserver(boughtLottoBoard);
lottosState.addObserver(winningLottoForm);
lottoResultState.addObserver(lottoResultModal);
isResultModalOnState.addObserver(winningLottoForm);
isResultModalOnState.addObserver(lottoResultModal);

new MainComponent(
  $("#app"),
  buyAmountForm,
  boughtLottoBoard,
  winningLottoForm,
  lottoResultModal
).init();
