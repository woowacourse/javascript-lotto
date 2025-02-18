import { INPUT } from './constants/messages.js';
import { validatePurchasePrice } from './utils/validaition.js';
import handleUserInput from './view/handleUserInput.js';

async function run() {
  const purchasePrice = await handleUserInput(INPUT.PURCHASE_PRICE, validatePurchasePrice);
}

run();
