import LottoWebApp from "./step2-web/controller/LottoWebApp.js";
import LottosState from "./step2-web/model/LottosState.js";
import { $ } from "./step2-web/utils/selector.js";
import BuyAmountForm from "./step2-web/view/BuyAmountForm.js";

const lottosState = new LottosState();

const buyAmountFormView = new BuyAmountForm("buy-amount-form", lottosState);

new LottoWebApp($("#app"), [buyAmountFormView]).init();
