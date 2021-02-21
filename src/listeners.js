import {
  $costInput,
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
  $costInput.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      return false;
    }
  })
  $costSubmitButton.addEventListener('click', onCostSumbit);
  $lottoNumbersToggleButton.addEventListener('click', onShowLottoNumbersToggle);
  $showResultButton.addEventListener('click', onModalShow);
  $modalClose.addEventListener('click', onModalClose);
};

export { addLottoGameListeners };
