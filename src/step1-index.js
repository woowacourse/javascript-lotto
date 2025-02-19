import InputView from "./view/inputView.js";
import SYSTEM_MESSAGE from "./constants/systemMessage.js";
import PurchaseService from "./service/PurchaseService.js";

const priceInput = await InputView.readUserInput(SYSTEM_MESSAGE.PRICE);

PurchaseService.purchaseLottos(priceInput);

// OutputView.print();
