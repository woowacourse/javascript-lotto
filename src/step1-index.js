import { lottoPicker } from "./infra/lottoPicker.js";
import LottoMachine from "./features/purchase/LottoMachine.js";

import LottoFacade from "./features/LottoFacade.js";

import PurchaseLottoUseCase from "./features/purchase/PurchaseLottoUseCase.js";
import WinningUseCase from "./features/winning/WinningUseCase.js";
import StatisticsUseCase from "./features/statistics/statisticsUseCase.js";

import inputView from "./ui/console/ConsoleInputView.js";
import outputView from "./ui/console/ConsoleOutputView.js";
import UI from "./ui/console/ConsoleUI.js";
import App from "./ui/console/ConsoleApp.js";

const lottoMachine = new LottoMachine(lottoPicker);

const purchaseUseCase = new PurchaseLottoUseCase(lottoMachine);
const winningUseCase = new WinningUseCase();
const statisticsUseCase = new StatisticsUseCase();

const lottoService = new LottoFacade({
  purchaseUseCase,
  winningUseCase,
  statisticsUseCase,
});

const ui = new UI({ inputView, outputView });
new App({ lottoService, ui }).run();
