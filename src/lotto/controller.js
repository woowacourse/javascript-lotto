import {
  $resultModalOpenButton,
  $costSubmitButton,
  $costSubmitForm,
  $lottoNumbersToggleButton,
  $costInput,
  $modalClose,
  $correctNumberWrapper,
  $restartButton,
} from '../elements.js';
import service from './service.js';
import message from "./validators/message.js"
import { getCorrectNumbers } from './domReader.js'

const onCostSumbit = () => {
  const cost = Number($costInput.value);
  const userGuideMessage = message.getCostValidation(cost);
  if (userGuideMessage !== '') {
    service.guideUserInput(userGuideMessage, () => {
      $costInput.value = '';
    });
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
  service.openResultModal(getCorrectNumbers());
};

const onResultModalClose = () => {
  service.closeResultModal();
};

const onCorrectNumberInput = (e) => {
  const userGuideMessage = message.getCorrectValidation(getCorrectNumbers());
  if (userGuideMessage !== '') {
    service.guideUserInput(userGuideMessage, () => {
      e.target.value = '';
      e.target.focus();
    });
  }
};

const onRestart = () => {
  service.restart();
};

export default {
  addAllEventListener() {
    $costSubmitForm.addEventListener('submit', onCostSubmitByEnterKey);
    $costSubmitButton.addEventListener('click', onCostSumbit);
    $lottoNumbersToggleButton.addEventListener('click', onShowLottoNumbersToggle);
    $modalClose.addEventListener('click', onResultModalClose);
    $resultModalOpenButton.addEventListener('click', onResultModalOpen);
    $correctNumberWrapper.addEventListener('focusout', onCorrectNumberInput);
    $restartButton.addEventListener('click', onRestart);
  },
};
