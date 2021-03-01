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
  $correctNumberInputForm,
  $manualLottoNumbersWrapper,
  $$correctNumberInputs,
  $$lottoNumberInputs
} from '../elements.js';
import message from './validators/message.js';
import { getAllNumbers } from './domReader.js';

const lottoGame = new LottoGame();

let remainLottoCount;

const getTotalProfit = (rankItemList) => {
  return rankItemList.reduce(
    (acc, rankItem) => acc + rankItem.money * rankItem.winCount,
    0,
  );
};

const purchaseAutoLottoItems = (count) => {
  remainLottoCount -= count;
  lottoGame.addLottoItems(count);
  lottoGameView.displayPurchaseResult(lottoGame.lottoItemList);
  lottoGameView.displayRemainLottoNumberCount(remainLottoCount);
  checkPurchaseLottoDone();
};

const purchaseManualLottoItem = (lottoNumbers) => {
  remainLottoCount -= 1;
  lottoGame.addLottoItem(lottoNumbers);
  lottoGameView.displayPurchaseResult(lottoGame.lottoItemList);
  lottoGameView.displayRemainLottoNumberCount(remainLottoCount);
  checkPurchaseLottoDone();
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

const checkPurchaseLottoDone = () => {
  if (remainLottoCount === 0) {
    lottoGameView.hideChoiceMethodButton();
    lottoGameView.hideRemainLottoNumberCount();
    lottoGameView.hideAutoCountForm();
    lottoGameView.hideManualLottoNumbersForm();
  }
}

const onCostSubmit = (e) => {
  e.preventDefault();
  const cost = Number($costInput.value);
  const userGuideMessage = message.getCostValidation(cost);
  if (userGuideMessage) {
    lottoGameView.showMessage(userGuideMessage);
    $costInput.value = '';
    return;
  }
  remainLottoCount = cost / LOTTO.PRICE;
  lottoGameView.displayChoiceMethodButton();
  lottoGameView.resetToggleButton();
};

const onAutoPurchase = () => {
  lottoGameView.hideManualLottoNumbersForm();
  lottoGameView.displayAutoCountForm();
  lottoGameView.displayRemainLottoNumberCount(remainLottoCount);
}

const onManualPurchase = () => {
  lottoGameView.hideAutoCountForm();
  lottoGameView.displayManualLottoNumbersForm();
  lottoGameView.displayRemainLottoNumberCount(remainLottoCount);
}

const onAutoCount = (e) => {
  e.preventDefault();
  const count = Number($autoCountInput.value);
  const userGuideMessage = message.getPurchaseAutoCountValidation(count, remainLottoCount);
  if (userGuideMessage) {
    lottoGameView.showMessage(userGuideMessage);
    $autoCountInput.value = '';
    return;
  }
  $autoCountInput.value = '';
  purchaseAutoLottoItems(count);
};

const onManualLotto = (e) => {
  e.preventDefault();
  const lottoNumbers = getAllNumbers($$lottoNumberInputs);
  const userGuideMessage = message.getPurchaseManualLottoValidation(lottoNumbers);
  if (userGuideMessage) {
    lottoGameView.showMessage(userGuideMessage);
    $autoCountInput.value = '';
    return;
  }
  $$lottoNumberInputs.forEach(
    ($lottoNumberInput) => ($lottoNumberInput.value = ''),
  );
  purchaseManualLottoItem(lottoNumbers);
};

const onShowLottoNumbersToggle = (e) => {
  e.target.checked
    ? lottoGameView.displayLottoNumbers() 
    : lottoGameView.hideLottoNumbers();
};

const onResultModalOpen = (e) => {
  e.preventDefault();
  const correctNumbers = getAllNumbers($$correctNumberInputs);
  const userGuideMessage = message.getModalOpenValidation(correctNumbers);
  if (userGuideMessage) {
    lottoGameView.showMessage(userGuideMessage);
    return;
  }
  assignResult(correctNumbers);
  showWinningResult();
};

const onResultModalClose = () => {
  lottoGameView.closeResultModal();
};

const onCorrectNumberInput = (e, $$elements) => {
  const userGuideMessage = message.getCorrectNumberValidation(getAllNumbers($$elements));
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
    $autoCountForm.addEventListener('submit', onAutoCount);
    $manualLottoNumbersForm.addEventListener('submit', onManualLotto);
    $lottoNumbersToggleButton.addEventListener('change', onShowLottoNumbersToggle);
    $modalClose.addEventListener('click', onResultModalClose);
    $correctNumberInputForm.addEventListener('submit', onResultModalOpen);
    $manualLottoNumbersWrapper.addEventListener('focusout', (e) => {
      onCorrectNumberInput(e, $$lottoNumberInputs);
    });
    $correctNumberWrapper.addEventListener('focusout', (e) => {
      onCorrectNumberInput(e, $$correctNumberInputs);
    });
    $restartButton.addEventListener('click', onRestart);
    window.addEventListener('keyup', onModalAccessibility);
  },
};

export default controller;
