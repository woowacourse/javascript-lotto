import {
  $resultModalOpenButton,
  $costSubmitButton,
  $costSubmitForm,
  $lottoNumbersToggleButton,
  $costInput,
  $modalClose,
  $winningAndBonusNumberWrapper,
  $restartButton
} from '../elements.js';
import { $ } from '../utils/querySelector.js';
import { MESSAGE } from '../constants.js';
import validator from './validator.js';
import service from './service.js';

const getAllnumbers = () => {
  const winningNumbers = $('.winning-number', $winningAndBonusNumberWrapper)
    .filter(({ value }) => value !== '')
    .map(({ value }) => Number(value));
  const bonusNumberInput = $('.bonus-number', $winningAndBonusNumberWrapper).value;
  const allNumbers = bonusNumberInput === '' ? [...winningNumbers] : [...winningNumbers, Number(bonusNumberInput)];

  return allNumbers;
}

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
  service.openResultModal(getAllnumbers());
};

const onResultModalClose = () => {
  service.closeResultModal();
};

const onWinningAndBonusNumberInput = (e) => {
  if (!e.target.classList.contains('winning-number') && !e.target.classList.contains('bonus-number')) {
    return;
  }
  const allNumbers = getAllnumbers();
  if (validator.isDuplicatedNumberExist(allNumbers)) {
    alert(MESSAGE.DUPLICATED_NUMBER_EXIST_MESSAGE);
    e.target.value = '';
    e.target.focus();
    return;
  }
  if (validator.isNumberOutOfRangeExist(allNumbers)) {
    alert(MESSAGE.NUMBER_RANGE_EXCEEDED_MESSAGE);
    e.target.value = '';
    e.target.focus();
    return;
  }
}

const onRestart = () => {
  service.restart();
}

export default {
  addAllEventListener() {
    $costSubmitForm.addEventListener('submit', onCostSubmitByEnterKey);
    $costSubmitButton.addEventListener('click', onCostSumbit);
    $lottoNumbersToggleButton.addEventListener('click', onShowLottoNumbersToggle);
    $modalClose.addEventListener('click', onResultModalClose);
    $resultModalOpenButton.addEventListener('click', onResultModalOpen);
    $winningAndBonusNumberWrapper.addEventListener('focusout', onWinningAndBonusNumberInput);
    $restartButton.addEventListener('click', onRestart)
  },
};
