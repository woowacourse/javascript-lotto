import { randomPicker } from "./infra/randomPicker.js";
import LottoMachine from "./lotto/purchase/LottoMachine.js";
import PurchaseLottoUseCase from "./lotto/purchase/PurchaseLottoUseCase.js";

import inputView from "./ui/console/ConsoleInputView.js";
import outputView from "./ui/console/ConsoleOutputView.js";
import UI from "./ui/console/ConsoleUI.js";
import App from "./ui/console/ConsoleApp.js";

const lottoMachine = new LottoMachine(randomPicker);
const purchaseLottoUseCase = new PurchaseLottoUseCase(lottoMachine);

const ui = new UI({ inputView, outputView });
new App({ purchaseLottoUseCase, ui }).run();
