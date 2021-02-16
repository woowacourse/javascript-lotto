import {
  $costSubmitButton,
  $showResultButton,
  $modalClose,
  $lottoNumbersToggleButton,
} from './elements.js';
import {
  onCostSumbit,
  onShowLottoNumbersToggle,
  onModalShow,
  onModalClose,
} from './handlers.js';

const addLottoGameListeners = () => {
  $costSubmitButton.addEventListener('click', onCostSumbit);
  $lottoNumbersToggleButton.addEventListener('click', onShowLottoNumbersToggle);
  $showResultButton.addEventListener('click', onModalShow);
  $modalClose.addEventListener('click', onModalClose);
};

export { addLottoGameListeners };
