import { lottoPicker } from "./infra/lottoPicker.js";
import LottoMachine from "./features/purchase/LottoMachine.js";
import PurchaseLottoUseCase from "./features/purchase/PurchaseLottoUseCase.js";

import inputView from "./ui/console/ConsoleInputView.js";
import outputView from "./ui/console/ConsoleOutputView.js";
import UI from "./ui/console/ConsoleUI.js";
import App from "./ui/console/ConsoleApp.js";

const lottoMachine = new LottoMachine(lottoPicker);
const purchaseLottoUseCase = new PurchaseLottoUseCase(lottoMachine);

const ui = new UI({ inputView, outputView });
new App({ purchaseLottoUseCase, ui }).run();
