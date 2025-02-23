import { LOTTO_SYSTEM } from './constants/LottoSystem.js';
import { calculateRevenue } from './domain/calculateRevenue.js';
import { getLottos } from './domain/getLottos.js';
import { getWinningMatchCount } from './domain/getWinningMatchCount.js';
import WinningLotto from './domain/WinningLotto.js';
import { checkReplay } from './utils/checkReplay.js';
import { parseWinningNumbers } from './utils/parseString.js';
import { isYesOrNo } from './validation/validateInput.js';
import { validateBonusNumber, validateWinningNumbers } from './validation/validateLottoNumbers.js';
import { validatePurchasePrice } from './validation/validatePurchasePrice.js';
import handleUserInput from './view/handleUserInput.js';
import { printPurchasedQuantity, printLottos, printStatistics } from './view/output.js';

async function run() {
  const purchasePrice = Number(await handleUserInput(INPUT.PURCHASE_PRICE, validatePurchasePrice));
  const quantityOfLottos = Math.floor(purchasePrice / LOTTO_SYSTEM.MIN_PURCHASE_PRICE);
  const lottos = getLottos(quantityOfLottos);
  printPurchasedQuantity(quantityOfLottos);
  printLottos(lottos.map((lotto) => `[${lotto.getNumbers().join(', ')}]`));

  const stringOfWinningNumbers = await handleUserInput(INPUT.WINNING_NUMBERS, validateWinningNumbers);
  const winningNumbers = parseWinningNumbers(stringOfWinningNumbers);

  const stirngOfbonusNumber = await handleUserInput(INPUT.BONUS_NUMBER, validateBonusNumber(winningNumbers));
  const bonusNumber = Number(stirngOfbonusNumber);
  const lottoNumbers = new WinningLotto(winningNumbers, bonusNumber);

  const matchCounts = getWinningMatchCount(lottos, lottoNumbers);
  const revenue = calculateRevenue(matchCounts, purchasePrice);

  printStatistics(matchCounts, revenue);

  const yesOrNo = await handleUserInput(INPUT.REPLAY_GAME, isYesOrNo);
  await checkReplay(yesOrNo, run);
}

const INPUT = Object.freeze({
  PURCHASE_PRICE: '> 구입금액을 입력해 주세요.',
  WINNING_NUMBERS: '> 당첨 번호를 입력해 주세요. ',
  BONUS_NUMBER: '\n> 보너스 번호를 입력해 주세요. ',
  REPLAY_GAME: '> 다시 시작하시겠습니까? (y/n) ',
});

run();
