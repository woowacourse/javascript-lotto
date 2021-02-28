import LottoGame from './LottoGame.js';
import lottoGameView from './view.js';
import { getProfitRate } from '../utils/calculate.js';
import { getKRString } from '../utils/format.js';
import { LOTTO } from '../constants.js';
import {
  $costSubmitForm,
  $lottoNumbersToggleButton,
  $costInput,
  $autoPurchaseButton,
  $manualPurchaseButton,
  $autoCountForm,
  $autoCountInput,
  $manualLottoNumbersForm,
  $modal,
  $modalClose,
  $correctNumberWrapper,
  $restartButton,
  $correctNumberInputForm
} from '../elements.js';
import message from './validators/message.js';
import { getCorrectNumbers } from './domReader.js';

const lottoGame = new LottoGame();

const getTotalProfit = (rankItemList) => {
  return rankItemList.reduce(
    (acc, rankItem) => acc + rankItem.money * rankItem.winCount,
    0,
  );
};

const purchaseLottoItems = (cost) => {
  const lottoItemCount = cost / LOTTO.PRICE;
  lottoGame.init();
  lottoGame.addLottoItems(lottoItemCount);
  lottoGameView.displayPurchaseResult(lottoGame.lottoItemList);
};

const assignResult = (correctNumbers) => {
  lottoGame.assignCorrectNumbers(correctNumbers);
  lottoGame.assignMatchCount();
}

const showWinningResult = () => {
  const rankItemList = lottoGame.getRankItemList();
  const profitRate = getProfitRate(lottoGame.totalCost, getTotalProfit(rankItemList));
  lottoGameView.openResultModal(rankItemList, getKRString(profitRate));
};

const onCostSubmit = (e) => {
  e.preventDefault();
  const cost = Number($costInput.value);
  const userGuideMessage = message.getCostValidation(cost);
  if (userGuideMessage) {
    lottoGameView.showMessage(userGuideMessage);
    $costInput.value = '';
    return;
  }
  lottoGameView.displayChoiceMethodButton();
  lottoGameView.resetToggleButton();
  purchaseLottoItems(cost);
};

const onAutoPurchase = () => {
  lottoGameView.hideManualLottoNumbersForm();
  lottoGameView.displayAutoCountForm();
}

const onManualPurchase = () => {
  lottoGameView.hideAutoCountForm();
  lottoGameView.displayManualLottoNumbersForm();
}

const onShowLottoNumbersToggle = (e) => {
  e.target.checked
    ? lottoGameView.displayLottoNumbers() 
    : lottoGameView.hideLottoNumbers();
};

const onResultModalOpen = (e) => {
  e.preventDefault();
  const correctNumbers = getCorrectNumbers();
  const userGuideMessage = message.getModalOpenValidation(correctNumbers);
  if (userGuideMessage) {
    lottoGameView.showMessage(userGuideMessage);
    return;
  }
  assignResult(correctNumbers);
  showWinningResult()
};

const onResultModalClose = () => {
  lottoGameView.closeResultModal();
};

const onCorrectNumberInput = (e) => {
  const userGuideMessage = message.getCorrectNumberValidation(getCorrectNumbers());
  if (userGuideMessage) {
    lottoGameView.showMessage(userGuideMessage);
    e.target.value = '';
    e.target.focus();
  }
};

const onRestart = () => {
  lottoGame.init();
  lottoGameView.init();
};

const onModalAccessibility = (e) => {
  if (!$modal.classList.contains('open')) return;

  if (e.code === "Escape"){
    onResultModalClose();
    return;
  }

  if (e.code === "Space"){
    onRestart();
  }
};

const controller = {
  bindLottoGameEvents() {
    $costSubmitForm.addEventListener('submit', onCostSubmit);
    $autoPurchaseButton.addEventListener('click', onAutoPurchase);
    $manualPurchaseButton.addEventListener('click', onManualPurchase);
    $lottoNumbersToggleButton.addEventListener('change', onShowLottoNumbersToggle);
    $modalClose.addEventListener('click', onResultModalClose);
    $correctNumberInputForm.addEventListener('submit', onResultModalOpen);
    $correctNumberWrapper.addEventListener('focusout', onCorrectNumberInput);
    $restartButton.addEventListener('click', onRestart);
    window.addEventListener('keyup', onModalAccessibility);
  },
};

export default controller;
