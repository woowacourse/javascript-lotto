import LottoWebApp from "./step2-web/controller/LottoWebApp.js";
import { $ } from "./step2-web/utils/selector.js";
import BuyAmountForm from "./step2-web/view/BuyAmountForm.js";

const buyAmountFormView = new BuyAmountForm("buy-amount-form");

new LottoWebApp($("#app"), [buyAmountFormView]).init();
