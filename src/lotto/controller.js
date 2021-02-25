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
import validationResult from './validation/validationResult.js';
import { getCorrectNumbers } from './domReader.js';

const onCostSubmit = () => {
  const cost = Number($costInput.value);
  const userGuideMessage = validationResult.getCostCheckResult(cost);
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
  onCostSubmit();
};

const onResultModalOpen = () => {
  const correctNumbers = getCorrectNumbers();
  const userGuideMessage = validationResult.getModalOpenCheckResult(correctNumbers);
  if (userGuideMessage !== '') {
    service.guideUserInput(userGuideMessage);
    return;
  }
  service.showWinningResult(correctNumbers);
};

const onResultModalClose = () => {
  service.hideWinningResult();
};

const onCorrectNumberInput = (e) => {
  const userGuideMessage = validationResult.getCorrectNumberCheckResult(getCorrectNumbers());
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

const controller = {
  bindLottoGameEvents() {
    $costSubmitForm.addEventListener('submit', onCostSubmitByEnterKey);
    $costSubmitButton.addEventListener('click', onCostSubmit);
    $lottoNumbersToggleButton.addEventListener('click', onShowLottoNumbersToggle);
    $modalClose.addEventListener('click', onResultModalClose);
    $resultModalOpenButton.addEventListener('click', onResultModalOpen);
    $correctNumberWrapper.addEventListener('focusout', onCorrectNumberInput);
    $restartButton.addEventListener('click', onRestart);
  },
};

export default controller;