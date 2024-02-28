import LottoWebApp from "./step2-web/controller/LottoWebApp.js";
import LottosState from "./step2-web/model/LottosState.js";
import { $ } from "./step2-web/utils/selector.js";
import BoughtLottoBoard from "./step2-web/view/BoughtLottoBoard.js";
import BuyAmountForm from "./step2-web/view/BuyAmountForm.js";

const lottosState = new LottosState();

const buyAmountFormView = new BuyAmountForm("buy-amount-form", lottosState);
const boughtLottoBoardView = new BoughtLottoBoard(
  "bought-lotto-board",
  lottosState
);

lottosState.addObserver(boughtLottoBoardView);

new LottoWebApp($("#app"), buyAmountFormView, boughtLottoBoardView).init();
