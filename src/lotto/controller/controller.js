import {
  $modalOpenButton,
  $depositAddButton,
  $deposit,
  $resultNumbersToggleButton,
  $depositInput,
  $modalCloseButton,
  $correctNumberInputWrapper,
  $restartButton,
  $autoPurchaseButton,
  $purchaseInputWrapper,
  $purchaseButton
} from '../../elements.js';
import connector from './connector.js';
import validation from '../validation/validation.js';
import lottoGameView from '../view/view.js';
import { lottoGame } from '../../store.js';
import { getCorrectNumbers, getCustomLottoNumbers } from '../view/domReader.js';
import { LOTTO, MESSAGE, VALIDATION } from '../../constants.js';

const onCostAdd = () => {
  const cost = Number($depositInput.value);
  const userGuideMessage = validation.getCostCheckResult(cost);
  if (userGuideMessage !== VALIDATION.NO_ERROR_MESSAGE) {
    connector.guideUserInput(userGuideMessage);
    return;
  }
  connector.depositMoney(cost);
  lottoGameView.emptyCostInput();
};

const canBuyLotto = () => {
  return lottoGame.getAffordableLottoItemCount() >= 1
}

const onAutoPurchase = () => {
  if (!canBuyLotto()) {
    lottoGameView.showMessage(MESSAGE.NOT_ENOUGH_MONEY);
    return;
  }

  connector.purchaseAsManyLottos();
}

const onPurchase = () => {
  if (!canBuyLotto()) {
    lottoGameView.showMessage(MESSAGE.NOT_ENOUGH_MONEY);
    return;
  }
  if (getCustomLottoNumbers().length < LOTTO.NUMBER_LIST_LENGTH) {
    lottoGameView.showMessage(MESSAGE.SHOULD_INPUT_ALL_NUMBERS_MESSAGE);
    return;
  }

  const lottoNumberList = getCustomLottoNumbers();
  connector.purchaseOneLotto(lottoNumberList);
}

const onShowLottoNumbersToggle = (e) => {
  connector.toggleLottoItemNumbers(e.target.checked);
};

const onCostAddByEnterKey = (e) => {
  e.preventDefault();
  onCostAdd();
};

const onResultModalOpen = () => {
  const correctNumbers = getCorrectNumbers();
  const userGuideMessage = validation.getModalOpenCheckResult(correctNumbers);
  if (userGuideMessage !== VALIDATION.NO_ERROR_MESSAGE) {
    connector.guideUserInput(userGuideMessage);
    return;
  }
  connector.showWinningResult(correctNumbers);
};

const onResultModalClose = () => {
  lottoGameView.hideResultModal();
};

const onCustomLottoNumberInput = (e) => {
  const userGuideMessage = validation.getInputNumbersCheckResult(getCustomLottoNumbers());
  if (userGuideMessage !== VALIDATION.NO_ERROR_MESSAGE) {
    connector.guideUserInput(userGuideMessage, () => {
      e.target.value = '';
      e.target.focus();
    });
  }
}

const onCorrectNumberInput = (e) => {
  const userGuideMessage = validation.getInputNumbersCheckResult(getCorrectNumbers());
  if (userGuideMessage !== VALIDATION.NO_ERROR_MESSAGE) {
    connector.guideUserInput(userGuideMessage, () => {
      e.target.value = '';
      e.target.focus();
    });
  }
};

const onRestart = () => {
  connector.restart();
};

const controller = {
  bindLottoGameEvents() {
    $deposit.addEventListener('submit', onCostAddByEnterKey);
    $depositAddButton.addEventListener('click', onCostAdd);
    $autoPurchaseButton.addEventListener('click', onAutoPurchase);
    $purchaseButton.addEventListener('click', onPurchase);
    $purchaseInputWrapper.addEventListener('focusout', onCustomLottoNumberInput);
    $resultNumbersToggleButton.addEventListener('click', onShowLottoNumbersToggle);
    $modalCloseButton.addEventListener('click', onResultModalClose);
    $modalOpenButton.addEventListener('click', onResultModalOpen);
    $correctNumberInputWrapper.addEventListener('focusout', onCorrectNumberInput);
    $restartButton.addEventListener('click', onRestart);
  },
};

export default controller;