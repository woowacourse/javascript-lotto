import {
  $costSubmitButton,
  $showResultButton,
  $modalClose,
} from './elements.js';
import { onCostSumbit, onModalShow, onModalClose } from './handlers.js';

const addLottoGameListeners = () => {
  $costSubmitButton.addEventListener('click', onCostSumbit);
  $showResultButton.addEventListener('click', onModalShow);
  $modalClose.addEventListener('click', onModalClose);
};

export { addLottoGameListeners };
