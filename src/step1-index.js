import InputView from "./view/inputView.js";
import SYSTEM_MESSAGE from "./constants/systemMessage.js";
import PurchaseService from "./service/PurchaseService.js";
import OutputView from "./view/outputView.js";

const priceInput = await InputView.readUserInput(SYSTEM_MESSAGE.PRICE);

const lottoCount = PurchaseService.getLottoCount(priceInput);
OutputView.print(SYSTEM_MESSAGE.COUNT(lottoCount));

const lottoArray = PurchaseService.getLottoArray(lottoCount);
OutputView.printLottoArray(lottoArray);
// 구매한 부분 출력 outputView

// OutputView.print();
