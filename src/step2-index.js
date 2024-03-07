import "./step2-web/style/index.css";
import LottoWebApp from "./step2-web/LottoWebApp.js";

import LottoResultState from "./step2-web/states/LottoResultState.js";
import LottosState from "./step2-web/states/LottosState.js";

import BoughtLottoBoard from "./step2-web/components/BoughtLottoBoard.js";
import BuyAmountForm from "./step2-web/components/BuyAmountForm.js";
import WinningLottoForm from "./step2-web/components/WinningLottoForm.js";
import LottoResultModal from "./step2-web/components/LottoResultModal.js";

import { $ } from "./step2-web/utils/selector.js";

const lottosState = new LottosState();
const lottoResultState = new LottoResultState();

const buyAmountForm = new BuyAmountForm("buy-amount-form", lottosState);
const boughtLottoBoard = new BoughtLottoBoard(
  "bought-lotto-board",
  lottosState
);
const winningLottoForm = new WinningLottoForm({
  targetElementId: "winning-lotto-form",
  lottosState,
  lottoResultState,
});
const lottoResultModal = new LottoResultModal({
  targetElementId: "lotto-result-modal",
  lottosState,
  lottoResultState,
});

lottosState.addObserver(boughtLottoBoard);
lottosState.addObserver(winningLottoForm);
lottoResultState.addObserver(lottoResultModal);

new LottoWebApp(
  $("#app"),
  buyAmountForm,
  boughtLottoBoard,
  winningLottoForm,
  lottoResultModal
).init();
