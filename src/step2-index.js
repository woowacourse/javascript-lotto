import { lottoPicker } from "./infra/lottoPicker.browser.js";
import LottoMachine from "./features/purchase/LottoMachine.js";

import LottoFacade from "./features/LottoFacade.js";

import PurchaseLottoUseCase from "./features/purchase/PurchaseLottoUseCase.js";
import WinningUseCase from "./features/winning/WinningUseCase.js";
import StatisticsUseCase from "./features/statistics/StatisticsUseCase.js";

import { App } from "./ui/web/WebApp.js";

const lottoMachine = new LottoMachine(lottoPicker);

const purchaseUseCase = new PurchaseLottoUseCase(lottoMachine);
const winningUseCase = new WinningUseCase();
const statisticsUseCase = new StatisticsUseCase();

const lottoService = new LottoFacade({
  purchaseUseCase,
  winningUseCase,
  statisticsUseCase,
});

const $app = document.querySelector("#app");
App($app, { lottoService });
