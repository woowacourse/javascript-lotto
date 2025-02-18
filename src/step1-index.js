import { INPUT } from './constants/messages.js';
import { parseWinningNumbers } from './utils/parseString.js';
import { validateBonusNumber, validatePurchasePrice, validateWinningNumbers } from './utils/validaition.js';
import handleUserInput from './view/handleUserInput.js';

async function run() {
  const purchasePrice = await handleUserInput(INPUT.PURCHASE_PRICE, validatePurchasePrice);

  const stringOfWinningNumbers = await handleUserInput(INPUT.WINNING_NUMBERS, validateWinningNumbers);
  const winningNumbers = parseWinningNumbers(stringOfWinningNumbers);

  const bonusNumber = await handleUserInput(INPUT.BONUS_NUMBER, validateBonusNumber, winningNumbers);
}

run();
