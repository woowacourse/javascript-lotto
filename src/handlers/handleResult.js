import createModal from '../View/create/createModal.js';
import createModalOverlay from '../View/create/createModalOverlay.js';
import { PRIZE_MONEY } from '../constants/MagicNumber.js';
import SELECTORS from '../constants/Selectors.js';
import reset from './reset.js';
import {
  calculatePrize,
  calculateRevenueRate,
  calculateWins,
} from '../service/CalculatorService.js';
import {
  getUIBonusNumber,
  getUIUserRetry,
  getUIWinningNumber,
} from '../service/InputService/UIInputService.js';
import {
  getBonusNumber,
  getUserRetry,
  getWinningNumber,
} from '../service/ParsingService.js';
import state from '../state.js';
import { handleLottoInputError } from '../util/errorHandler.js';

async function handleResult(event) {
  event.preventDefault();
  try {
    const userLotto = await getWinningNumber(
      getUIWinningNumber,
      handleLottoInputError,
    );
    const parsedLotto = await getBonusNumber(
      userLotto,
      getUIBonusNumber,
      handleLottoInputError,
    );

    state.winCount = calculateWins(state.lottos, parsedLotto);
    const total = calculatePrize(state.winCount, PRIZE_MONEY);
    const revenueRate = calculateRevenueRate(total, state.purchasePrice);

    createModalOverlay();
    createModal(state.winCount, revenueRate);
    const closeButton = document.getElementById(SELECTORS.BUTTON.CLOSE);

    closeButton.addEventListener('click', (event) => {
      event.preventDefault();
      reset();
    });

    const userRetry = await getUserRetry(getUIUserRetry);

    if (userRetry === 'y') {
      reset();
    }
  } catch (error) {
    console.log(error);
  }
}

export default handleResult;
