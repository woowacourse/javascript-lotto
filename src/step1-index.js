import { INPUT, LOTTO } from './constants/messages.js';
import { calculateRevenue } from './domain/calculateRevenue.js';
import { getRandomLottos } from './domain/getRandomLottos.js';
import { getWinningMatchCount } from './domain/getWinningMatchCount.js';
import { arrayToString } from './utils/arrayToString.js';
import { checkReplay } from './utils/checkReplay.js';
import { parseWinningNumbers } from './utils/parseString.js';
import { isYesOrNo } from './validation/validateInput.js';
import { validateBonusNumber, validateWinningNumbers } from './validation/validateLottoNumbers.js';
import { validatePurchasePrice } from './validation/validatePurchasePrice.js';
import handleUserInput from './view/handleUserInput.js';
import { printPurchasedQuantity, printRandomLottos, printStatistics } from './view/output.js';

async function run() {
  const purchasePrice = Number(await handleUserInput(INPUT.PURCHASE_PRICE, validatePurchasePrice));
  const randomlottos = getRandomLottos(purchasePrice / LOTTO.MIN_PURCHASE_PRICE);
  printPurchasedQuantity(purchasePrice / LOTTO.MIN_PURCHASE_PRICE);
  printRandomLottos(arrayToString(randomlottos));

  const stringOfWinningNumbers = await handleUserInput(INPUT.WINNING_NUMBERS, validateWinningNumbers);
  const winningNumbers = parseWinningNumbers(stringOfWinningNumbers);

  const bonusNumber = await handleUserInput(INPUT.BONUS_NUMBER, validateBonusNumber, winningNumbers);
  const lottoNumbers = { winningNumbers, bonusNumber };

  const matchCounts = getWinningMatchCount(randomlottos, lottoNumbers);
  const revenue = calculateRevenue(matchCounts, purchasePrice);

  printStatistics(matchCounts, revenue);

  const yesOrNo = await handleUserInput(INPUT.REPLAY_GAME, isYesOrNo);
  await checkReplay(yesOrNo, run);
}

run();
