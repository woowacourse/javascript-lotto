import createLottoInput from '../View/create/createLottoInput.js';
import showLottoResult from '../View/show/showLottoResult.js';
import showPurchaseResult from '../View/show/showPurchaseResult.js';
import SELECTORS from '../constants/Selectors.js';
import { getUIPurchasePrice } from '../service/InputService/UIInputService.js';
import makeLotto from '../service/LottoService.js';
import { getPurchasePrice } from '../service/ParsingService.js';
import state from '../state.js';
import { handlePriceError } from '../util/errorHandler.js';

async function handlePurchase() {
  const purchaseButton = document.getElementById(SELECTORS.BUTTON.PURCHASE);
  purchaseButton.disabled = true;

  try {
    const { purchasePrice: price, purchaseAmount } = await getPurchasePrice(
      getUIPurchasePrice,
      handlePriceError,
    );
    state.purchasePrice = price;
    showPurchaseResult(purchaseAmount);

    state.lottos = makeLotto(purchaseAmount);
    showLottoResult(state.lottos);
    createLottoInput();
  } catch (error) {
    console.log(error);
    purchaseButton.disabled = false;
  }
}

export default handlePurchase;
