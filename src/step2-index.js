import { lottoPicker } from "./infra/lottoPicker.browser.js";
import LottoMachine from "./features/purchase/LottoMachine.js";
import PurchaseLottoUseCase from "./features/purchase/PurchaseLottoUseCase.js";

import { App } from "./ui/web/WebApp.js";

const lottoMachine = new LottoMachine(lottoPicker);
const purchaseLottoUseCase = new PurchaseLottoUseCase(lottoMachine);

const $app = document.querySelector("#app");
App($app, { purchaseUseCase: purchaseLottoUseCase });
