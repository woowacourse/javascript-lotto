import { DOM } from '../../DOM/dom.js';
import { validatePurchasePrice } from '../../validation/validatePurchasePrice.js';
import { errorHandler } from '../../utils/errorHandler.js';
import { LottoGame } from './LottoGame.js';
import { showLottos, showPurchaseResult } from './outputHandler.js';
import { generateLottos } from '../../domain/generateLottos.js';
import { LOTTO_SYSTEM } from '../../constants/LottoSystem.js';
import { disablePurchaseInputs } from './uiHandler.js';

export const handlePurchaseSubmit = (event) => {
  event.preventDefault();
  try {
    const purchasePrice = DOM.purchaseInput.value;
    validatePurchasePrice(purchasePrice);
    LottoGame.purchasePrice = purchasePrice;
    disablePurchaseInputs();
    purchaseLottos();
  } catch (error) {
    errorHandler(error);
  }
};

const purchaseLottos = () => {
  const quantity = Math.floor(LottoGame.purchasePrice / LOTTO_SYSTEM.MIN_PURCHASE_PRICE);
  showPurchaseResult(quantity);
  LottoGame.lottos = generateLottos(quantity);
  showLottos(LottoGame.lottos);
  DOM.systemMessage.style.display = 'flex';
};

export const handleWinningNumberInput = (index, value) => {
  LottoGame.winningNumbers[index] = Number(value);
};

export const handleBonusNumberInput = (value) => {
  LottoGame.bonusNumber = Number(value);
};
