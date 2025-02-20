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
import checkLottoPurchase from './util/checkLottoPurchase.js';
import Lotto from './model/Lotto.js';
import { getUniqueRandomNumbers } from './util/getUniqueRandomNumbers.js';
import checkBonusNumber from './util/checkBonusNumber.js';
import { calculateWins, calculatePrize } from './service/CalculatorService.js';

async function getPurchasePrice() {
  try {
    const purchasePrice = await readLineAsync(systemSettings.getPurchasePrice);
    const purchaseAmount = checkLottoPurchase(purchasePrice);
    printPurchasedAmount(purchaseAmount);
    return { purchasePrice, purchaseAmount };
  } catch (error) {
    printError(error.message);
    await getPurchasePrice();
  }
}
const { purchasePrice, purchaseAmount } = await getPurchasePrice();

const lottos = [];

for (let i = 0; i < purchaseAmount; i++) {
  const numberRange = { min: 1, max: 45 };
  const numbers = getUniqueRandomNumbers(numberRange, 6);
  const lotto = new Lotto(numbers);
  printLotto(lotto);
  lottos.push(lotto);
}

const winningNumber = await readLineAsync(systemSettings.getWinningNumber);

const userLotto = new Lotto(
  winningNumber.split(',').map((number) => Number(number)),
);
const bonusNumber = await readLineAsync(systemSettings.getBonusNumber);

const parsedLotto = checkBonusNumber(userLotto, Number(bonusNumber));

const winCount = calculateWins(lottos, parsedLotto);

const total = calculatePrize(winCount, systemSettings.prizeMoney);

const revenueRate = (total / Number(purchasePrice)) * 100;

printPrizeHeader();

printPrize(systemSettings);

printRevenueRate(revenueRate);
