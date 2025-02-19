import InputView from "./view/inputView.js";
import SYSTEM_MESSAGE from "./constants/systemMessage.js";
import PurchaseService from "./service/PurchaseService.js";
import OutputView from "./view/outputView.js";
import validatePrice from "./validation/validatePrice.js";
import retryOnError from "./util/retryOnError.js";
import validateWinningNumber from "./validation/validateWinningNumber.js";
const priceInput = await retryOnError(() => InputView.readUserInput(SYSTEM_MESSAGE.PRICE), OutputView.printError);
validatePrice(priceInput);

const lottoCount = PurchaseService.getLottoCount(priceInput);
OutputView.print(SYSTEM_MESSAGE.COUNT(lottoCount));

const lottoArray = PurchaseService.getLottoArray(lottoCount);
OutputView.printLottoArray(lottoArray);

const winningNumberInput = await InputView.readUserInput(SYSTEM_MESSAGE.WINNING_NUMBER);
validateWinningNumber(winningNumberInput);

const bonusNumberInput = await InputView.readUserInput(SYSTEM_MESSAGE.BONUS_NUMBER);
