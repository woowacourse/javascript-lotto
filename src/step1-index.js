import { lottoPicker } from "./infra/lottoPicker.js";
import LottoMachine from "./features/purchase/LottoMachine.js";

import LottoFacade from "./features/LottoFacade.js";

import PurchaseLottoUseCase from "./features/purchase/PurchaseLottoUseCase.js";
import StatisticsUseCase from "./features/statistics/StatisticsUseCase.js";

import inputView from "./ui/console/ConsoleInputView.js";
import outputView from "./ui/console/ConsoleOutputView.js";
import UI from "./ui/console/ConsoleUI.js";
import App from "./ui/console/ConsoleApp.js";

const lottoMachine = new LottoMachine(lottoPicker);

const purchaseUseCase = new PurchaseLottoUseCase(lottoMachine);
const statisticsUseCase = new StatisticsUseCase();

const lottoFacade = new LottoFacade({
  purchaseUseCase,
  statisticsUseCase,
});

const ui = new UI({ inputView, outputView });
new App({ lottoFacade, ui }).run();
