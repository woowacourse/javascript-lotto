import readLineAsync from './View/InputView.js';
import systemSettings from './settings/systemSettings.js';
import {
  printMessage,
  printPurchasedAmount,
  printLotto,
} from './View/OutputView.js';
import checkLottoPurchase from './util/checkLottoPurchase.js';
import Lotto from './model/Lotto.js';
import { getUniqueRandomNumbers } from './util/getUniqueRandomNumbers.js';

// const purchasePrice = await readLineAsync(systemSettings.getPurchasePrice);
// const purchaseAmount = checkLottoPurchase(purchasePrice);

// printPurchasedAmount(purchaseAmount);

// const lottos = [];

// for (let i = 0; i < purchaseAmount; i++) {
//   const numberRange = { min: 1, max: 45 };
//   const numbers = getUniqueRandomNumbers(numberRange, 6);
//   const lotto = new Lotto(numbers);
//   printLotto(lotto);
//   lottos.push(lotto);
// }

const winningNumber = await readLineAsync(systemSettings.getWinningNumber);

// const bonusNumber = await readLineAsync(systemSettings.getBonusNumber);
const userLotto = new Lotto(
  winningNumber.split(',').map((number) => Number(number)),
);
