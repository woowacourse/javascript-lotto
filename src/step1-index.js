import {
  printPrizeHeader,
  printPrize,
  printRevenueRate,
} from './View/OutputView.js';
import {
  getPurchasePrice,
  getWinningNumber,
  getBonusNumber,
  getUserRetry,
} from './service/ParsingService.js';
import {
  calculateWins,
  calculatePrize,
  calculateRevenueRate,
} from './service/CalculatorService.js';
import makeLotto from './service/LottoService.js';
import { PRIZE_MONEY } from './constants/MagicNumber.js';
import {
  getConsoleBonusNumber,
  getConsolePurchasePrice,
  getConsoleUserRetry,
  getConsoleWinningNumber,
} from './service/InputService/ConsoleInputService.js';
import { displayError } from './util/errorHandler.js';

async function playGame() {
  const { purchasePrice, purchaseAmount } = await getPurchasePrice(
    getConsolePurchasePrice,
    displayError,
  );

  const lottos = makeLotto(purchaseAmount);

  const userLotto = await getWinningNumber(
    getConsoleWinningNumber,
    displayError,
  );
  const parsedLotto = await getBonusNumber(
    userLotto,
    getConsoleBonusNumber,
    displayError,
  );

  const winCount = calculateWins(lottos, parsedLotto);
  const total = calculatePrize(winCount, PRIZE_MONEY);
  const revenueRate = calculateRevenueRate(total, purchasePrice);

  printPrizeHeader();
  printPrize(winCount);
  printRevenueRate(revenueRate);
}

const main = async () => {
  while (true) {
    await playGame();
    let userRetry;

    while (true) {
      userRetry = await getUserRetry(getConsoleUserRetry, displayError);
      if (userRetry === 'y' || userRetry === 'n') break;
    }
    if (userRetry === 'n') break;
  }
};
main();
