import {
  $resultModalOpenButton,
  $costAddButton,
  $purchaseForm,
  $lottoNumbersToggleButton,
  $costInput,
  $modalClose,
  $correctNumberWrapper,
  $restartButton,
  $autoPurchaseButton
} from '../../elements.js';
import connector from './connector.js';
import validation from '../validation/validation.js';
import lottoGameView from '../view/view.js';
import { lottoGame } from '../../store.js';
import { getCorrectNumbers } from '../view/domReader.js';
import { MESSAGE, VALID_CHECK_RESULT } from '../../constants.js';

const onCostAdd = () => {
  const cost = Number($costInput.value);
  const userGuideMessage = validation.getCostCheckResult(cost);
  if (userGuideMessage !== VALID_CHECK_RESULT) {
    connector.guideUserInput(userGuideMessage);
    return;
  }
  connector.depositMoney(cost);
  lottoGameView.emptyCostInput();
};

const onAutoPurchase = () => {
  if (lottoGame.getAffordableLottoItemCount() < 1) {
    lottoGameView.showMessage(MESSAGE.NOT_ENOUGH_MONEY);
    return;
  }
  connector.purchaseLottoItems(lottoGame.Deposit);
  lottoGameView.initToggleButton();
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
  if (userGuideMessage !== VALID_CHECK_RESULT) {
    connector.guideUserInput(userGuideMessage);
    return;
  }
  connector.showWinningResult(correctNumbers);
};

const onResultModalClose = () => {
  lottoGameView.hideResultModal();
};

const onCorrectNumberInput = (e) => {
  const userGuideMessage = validation.getCorrectNumberCheckResult(getCorrectNumbers());
  if (userGuideMessage !== VALID_CHECK_RESULT) {
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
    $purchaseForm.addEventListener('submit', onCostAddByEnterKey);
    $costAddButton.addEventListener('click', onCostAdd);
    $autoPurchaseButton.addEventListener('click', onAutoPurchase);
    $lottoNumbersToggleButton.addEventListener('click', onShowLottoNumbersToggle);
    $modalClose.addEventListener('click', onResultModalClose);
    $resultModalOpenButton.addEventListener('click', onResultModalOpen);
    $correctNumberWrapper.addEventListener('focusout', onCorrectNumberInput);
    $restartButton.addEventListener('click', onRestart);
  },
};

export default controller;