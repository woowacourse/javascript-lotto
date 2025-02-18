import readLineAsync from './View/InputView.js';
import systemSettings from './settings/systemSettings.js';
import { printMessage } from './View/OutputView.js';
import checkLottoPurchase from './util/checkLottoPurchase.js';

const purchasePrice = await readLineAsync(systemSettings.getPurchasePrice);
checkLottoPurchase(purchasePrice);
printMessage(systemSettings.printPurchasedAmount(purchasePrice / 1000));
