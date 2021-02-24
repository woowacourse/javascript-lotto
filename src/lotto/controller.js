import {
  $resultModalOpenButton,
  $costSubmitButton,
  $costSubmitForm,
  $lottoNumbersToggleButton,
  $costInput,
  $modalClose,
  $correctNumberWrapper,
  $restartButton,
  $winningNumberInputForm
} from '../elements.js';
import service from './service.js';
import message from './validators/message.js';
import { getCorrectNumbers } from './domReader.js';

const onCostSubmit = () => {
  const cost = Number($costInput.value);
  const userGuideMessage = message.getCostValidation(cost);
  if (userGuideMessage) {
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

const onResultModalOpen = () => {
  const correctNumbers = getCorrectNumbers();
  const userGuideMessage = message.getModalOpenValidation(correctNumbers);
  if (userGuideMessage) {
    service.guideUserInput(userGuideMessage);
    return;
  }
  service.showWinningResult(correctNumbers);
};

const onResultModalClose = () => {
  service.hideWinningResult();
};

const onCorrectNumberInput = (e) => {
  const userGuideMessage = message.getCorrectNumberValidation(getCorrectNumbers());
  if (userGuideMessage) {
    service.guideUserInput(userGuideMessage, () => {
      e.target.value = '';
      e.target.focus();
    });
  }
};

const onRestart = () => {
  service.restart();
};

const controller = {
  bindLottoGameEvents() {
    $costSubmitForm.addEventListener('submit', onCostSubmit);
    $costSubmitButton.addEventListener('click', onCostSubmit);
    $lottoNumbersToggleButton.addEventListener('click', onShowLottoNumbersToggle);
    $modalClose.addEventListener('click', onResultModalClose);
    $winningNumberInputForm.addEventListener('submit', onResultModalOpen);
    $resultModalOpenButton.addEventListener('click', onResultModalOpen);
    $correctNumberWrapper.addEventListener('focusout', onCorrectNumberInput);
    $restartButton.addEventListener('click', onRestart);
  },
};

export default controller;