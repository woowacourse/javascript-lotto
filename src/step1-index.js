import InputView from "./view/inputView.js";
import SYSTEM_MESSAGE from "./constants/systemMessage.js";
import PurchaseService from "./service/PurchaseService.js";
import OutputView from "./view/outputView.js";
import validatePrice from "./validation/validatePrice.js";
import retryOnError from "./util/retryOnError.js";
import validateWinningNumber from "./validation/validateWinningNumber.js";
import { parsePrice, parseWinningNumbers, parseBonusNumber } from "./service/ParsingService.js";
import validateBonusNumber from "./validation/validateBonusNumber.js";
import WinningLotto from "./domain/WinningLotto.js";

const getPrice = async () => {
  const priceInput = await InputView.readUserInput(SYSTEM_MESSAGE.PRICE);
  validatePrice(priceInput);
  return parsePrice(priceInput);
};

const getWinningNumber = async () => {
  const winningNumberInput = await InputView.readUserInput(SYSTEM_MESSAGE.WINNING_NUMBER);
  validateWinningNumber(winningNumberInput);
  return parseWinningNumbers(winningNumberInput);
};

const getBonusNumber = async () => {
  const bonusNumberInput = await InputView.readUserInput(SYSTEM_MESSAGE.BONUS_NUMBER);
  validateBonusNumber(winningNumbers, bonusNumberInput);
  return parseBonusNumber(bonusNumberInput);
};

// 가격 입력
const price = await retryOnError(getPrice, OutputView.printError);

const lottoCount = PurchaseService.getLottoCount(price);
OutputView.print(SYSTEM_MESSAGE.COUNT(lottoCount));

const lottoArray = PurchaseService.getLottoArray(lottoCount);
OutputView.printLottoArray(lottoArray);

// 당첨 번호 입력
const winningNumbers = await retryOnError(getWinningNumber, OutputView.printError);
const bonusNumber = await retryOnError(getBonusNumber, OutputView.printError);
const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
