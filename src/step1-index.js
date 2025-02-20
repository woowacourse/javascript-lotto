import systemSettings from './settings/systemSettings.js';
import {
  printPrizeHeader,
  printPrize,
  printRevenueRate,
} from './View/OutputView.js';
import {
  calculateWins,
  calculatePrize,
  calculateRevenueRate,
} from './service/CalculatorService.js';
import {
  getPurchasePrice,
  getWinningNumber,
  getBonusNumber,
  getUserRetry,
} from './service/ParsingService.js';
import makeLotto from './service/LottoService.js';

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
