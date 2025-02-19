import readLineAsync from './View/InputView.js';
import systemSettings from './settings/systemSettings.js';
import { printMessage, printPurchasedAmount } from './View/OutputView.js';
import checkLottoPurchase from './util/checkLottoPurchase.js';

const purchasePrice = await readLineAsync(systemSettings.getPurchasePrice);
const purchaseAmount = checkLottoPurchase(purchasePrice);

printPurchasedAmount(purchaseAmount);
