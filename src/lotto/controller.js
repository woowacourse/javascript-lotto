import {
  $resultModalOpenButton,
  $costSubmitButton,
  $costSubmitForm,
  $lottoNumbersToggleButton,
  $costInput,
  $modalClose,
} from '../elements.js';
import { MESSAGE } from '../constants.js';
import validator from './validator.js';
import service from './service.js';

const onCostSumbit = () => {
  const cost = Number($costInput.value);
  if (validator.isMoneyLessThanMinCost(cost)) {
    alert(MESSAGE.SHOULD_EXCEED_MIN_COST);
    return;
  }
  if (validator.isChangeMoneyExist(cost)) {
    alert(MESSAGE.GET_SHOULD_NOT_HAVE_CHANGE_MESSAGE(cost));
    return;
  }
  service.initToggleButton();
  service.purchaseLottoItems(cost);
};

const onShowLottoNumbersToggle = (e) => {
  service.toggleLottoItemNumbers(e.target.checked);
};

const onCostSubmitByEnterKey = (e) => {
  e.preventDefault();
  onCostSumbit();
};

const onResultModalOpen = () => {

};

const onResultModalClose = () => {
  
};

export default {
  addAllEventListener() {
    $costSubmitForm.addEventListener('submit', onCostSubmitByEnterKey);
    $costSubmitButton.addEventListener('click', onCostSumbit);
    $lottoNumbersToggleButton.addEventListener('click', onShowLottoNumbersToggle);
    $modalClose.addEventListener('click', onResultModalClose);
    $resultModalOpenButton.addEventListener('click', onResultModalOpen);
  },
};
