import systemSettings from './settings/systemSettings.js';
import {
  printLotto,
  printPrizeHeader,
  printPrize,
  printRevenueRate,
} from './View/OutputView.js';
import Lotto from './model/Lotto.js';
import { getUniqueRandomNumbers } from './util/getUniqueRandomNumbers.js';
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
