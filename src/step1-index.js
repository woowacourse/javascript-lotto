import readLineAsync from './View/InputView.js';
import systemSettings from './settings/systemSettings.js';
import {
  printPurchasedAmount,
  printLotto,
  printPrizeHeader,
  printPrize,
  printRevenueRate,
  printError,
} from './View/OutputView.js';
import Lotto from './model/Lotto.js';
import { getUniqueRandomNumbers } from './util/getUniqueRandomNumbers.js';
import {
  calculateWins,
  calculatePrize,
  calculateRevenueRate,
} from './service/CalculatorService.js';
import validateUserRetry from './Validation/validateUserRetry.js';
import validateLottoPurchase from './Validation/validateLottoPurchase.js';
import validateBonusNumber from './Validation/validateBonusNumber.js';

async function getPurchasePrice() {
  try {
    const purchasePrice = await readLineAsync(systemSettings.getPurchasePrice);
    const purchaseAmount = validateLottoPurchase(purchasePrice);
    printPurchasedAmount(purchaseAmount);
    return { purchasePrice, purchaseAmount };
  } catch (error) {
    printError(error.message);
    return await getPurchasePrice();
  }
}
async function getWinningNumber() {
  try {
    const winningNumber = await readLineAsync(systemSettings.getWinningNumber);
    const userLotto = new Lotto(
      winningNumber.split(',').map((number) => Number(number)),
    );
    return userLotto;
  } catch (error) {
    printError(error.message);
    return await getWinningNumber();
  }
}
async function getBonusNumber(userLotto) {
  try {
    const bonusNumber = await readLineAsync(systemSettings.getBonusNumber);
    const parsedLotto = validateBonusNumber(userLotto, Number(bonusNumber));
    return parsedLotto;
  } catch (error) {
    printError(error.message);
    return await getBonusNumber(userLotto);
  }
}

async function getUserRetry() {
  try {
    const userRetry = await readLineAsync(`${systemSettings.askUserRetry}`);
    validateUserRetry(userRetry);
    return userRetry;
  } catch (error) {
    printError(error.message);
    return await getUserRetry();
  }
}

function makeLotto(purchaseAmount) {
  const lottos = [];

  for (let i = 0; i < purchaseAmount; i++) {
    const numberRange = {
      min: systemSettings.minLottoNumber,
      max: systemSettings.maxLottoNumber,
    };
    const numbers = getUniqueRandomNumbers(
      numberRange,
      systemSettings.lottoSize,
    );
    const lotto = new Lotto(numbers);
    printLotto(lotto);
    lottos.push(lotto);
  }
  return lottos;
}
async function playGame() {
  const { purchasePrice, purchaseAmount } = await getPurchasePrice();

  const lottos = makeLotto(purchaseAmount);

  const userLotto = await getWinningNumber();
  const parsedLotto = await getBonusNumber(userLotto);

  const winCount = calculateWins(lottos, parsedLotto);
  const total = calculatePrize(winCount, systemSettings.prizeMoney);
  const revenueRate = calculateRevenueRate(total, purchasePrice);

  printPrizeHeader();
  printPrize(systemSettings);
  printRevenueRate(revenueRate);

  const userRetry = await getUserRetry();

  return userRetry;
}

const userRetry = await playGame();

if (userRetry === 'y') await playGame();
