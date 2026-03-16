import { lottoPicker } from "./infra/lottoPicker.browser.js";
import LottoMachine from "./features/purchase/LottoMachine.js";

import LottoFacade from "./features/LottoFacade.js";

import PurchaseLottoUseCase from "./features/purchase/PurchaseLottoUseCase.js";
import StatisticsUseCase from "./features/statistics/StatisticsUseCase.js";

import { App } from "./ui/web/WebApp.js";

const lottoMachine = new LottoMachine(lottoPicker);

const purchaseUseCase = new PurchaseLottoUseCase(lottoMachine);
const statisticsUseCase = new StatisticsUseCase();

const lottoFacade = new LottoFacade({
  purchaseUseCase,
  statisticsUseCase,
});

const $app = document.querySelector("#app");
App($app, { lottoFacade });
