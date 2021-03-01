import LottoGame from './LottoGame.js';
import LottoView from './views/View.js';
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
  $$lottoNumberInputs,
} from '../elements.js';
import message from './validators/message.js';
import { getAllNumbers } from './domReader.js';
import { getTotalProfit } from './totalProfit.js';

const lottoGame = new LottoGame();
const lottoView = new LottoView();

const purchaseAutoLottoItems = (count) => {
  lottoGame.addLottoItems(count);
  lottoView.resultSection.displayPurchaseResult(lottoGame.lottoItemList);
  lottoView.purchaseSection.displayRemainLottoNumberCount(lottoGame.remainLottoCount);
  checkPurchaseLottoDone();
};

const purchaseManualLottoItem = (lottoNumbers) => {
  lottoGame.addLottoItem(lottoNumbers);
  lottoView.resultSection.displayPurchaseResult(lottoGame.lottoItemList);
  lottoView.purchaseSection.displayRemainLottoNumberCount(lottoGame.remainLottoCount);
  checkPurchaseLottoDone();
};

const assignResult = (correctNumbers) => {
  lottoGame.assignCorrectNumbers(correctNumbers);
  lottoGame.assignMatchCount();
};

const showWinningResult = () => {
  const rankItemList = lottoGame.getRankItemList();
  const profitRate = getProfitRate(lottoGame.totalCost, getTotalProfit(rankItemList));
  lottoView.modalSection.openResultModal(rankItemList, getKRString(profitRate));
};

const checkPurchaseLottoDone = () => {
  if (lottoGame.remainLottoCount === 0) {
    lottoView.purchaseSection.hideAllPurchaseSection();
    lottoView.winningSection.displayCorrectNumberInputForm();
  }
};

const onCost = (e) => {
  e.preventDefault();
  const cost = Number($costInput.value);
  const userGuideMessage = message.getCostValidation(cost);
  if (userGuideMessage) {
    lottoView.showMessage(userGuideMessage);
    lottoView.costSection.costInputInit();
    return;
  }

  lottoGame.assignRemainLottoCount(cost / LOTTO.PRICE);
  lottoView.costSection.disableButton();
  lottoView.purchaseSection.displayChoiceMethodButton();
  lottoView.resultSection.resetToggleButton();
};

const onAutoSelect = () => {
  lottoView.purchaseSection.hideManualLottoNumbersForm();
  lottoView.purchaseSection.displayAutoCountForm();
  lottoView.purchaseSection.displayRemainLottoNumberCount(lottoGame.remainLottoCount);
};

const onManualSelect = () => {
  lottoView.purchaseSection.hideAutoCountForm();
  lottoView.purchaseSection.displayManualLottoNumbersForm();
  lottoView.purchaseSection.displayRemainLottoNumberCount(lottoGame.remainLottoCount);
};

const onAutoPurchase = (e) => {
  e.preventDefault();
  const count = Number($autoCountInput.value);
  const userGuideMessage = message.getPurchaseAutoCountValidation(
    count,
    lottoGame.remainLottoCount,
    );
  
  lottoView.purchaseSection.autoCountInputInit();
  if (userGuideMessage) {
    lottoView.showMessage(userGuideMessage);
    return;
  }

  purchaseAutoLottoItems(count);
};

const onManualPurchase = (e) => {
  e.preventDefault();
  const lottoNumbers = getAllNumbers($$lottoNumberInputs);
  const userGuideMessage = message.getAllNumberValidation(lottoNumbers);
  if (userGuideMessage) {
    lottoView.showMessage(userGuideMessage);
    return;
  }

  lottoView.purchaseSection.lottoNumberInputsInit();
  purchaseManualLottoItem(lottoNumbers);
  e.target.elements['first-lotto-number'].focus();
};

const onShowLottoNumbersToggle = (e) => {
  e.target.checked
    ? lottoView.resultSection.displayLottoNumbers()
    : lottoView.resultSection.hideLottoNumbers();
};

const onResultModalOpen = (e) => {
  e.preventDefault();
  const correctNumbers = getAllNumbers($$correctNumberInputs);
  const userGuideMessage = message.getAllNumberValidation(correctNumbers);
  if (userGuideMessage) {
    lottoView.showMessage(userGuideMessage);
    return;
  }

  assignResult(correctNumbers);
  showWinningResult();
};

const onResultModalClose = () => {
  lottoView.modalSection.closeResultModal();
};

const onAllNumberInput = (e, $$elements) => {
  const userGuideMessage = message.getAllNumberValidation(
    getAllNumbers($$elements),
  );
  if (userGuideMessage) {
    lottoView.showMessage(userGuideMessage);
    e.target.value = '';
    e.target.focus();
  }
};

const onRestart = () => {
  lottoGame.init();
  lottoView.init();
};

const onModalAccessibility = (e) => {
  if (!$modal.classList.contains('open')) return;

  if (e.code === 'Escape') {
    onResultModalClose();
    return;
  }

  if (e.code === 'Space') {
    onRestart();
  }
};

const controller = {
  bindLottoGameEvents() {
    $costSubmitForm.addEventListener('submit', onCost);
    $autoPurchaseButton.addEventListener('click', onAutoSelect);
    $manualPurchaseButton.addEventListener('click', onManualSelect);
    $autoCountForm.addEventListener('submit', onAutoPurchase);
    $manualLottoNumbersForm.addEventListener('submit', onManualPurchase);
    $lottoNumbersToggleButton.addEventListener('change', onShowLottoNumbersToggle);
    $modalClose.addEventListener('click', onResultModalClose);
    $correctNumberInputForm.addEventListener('submit', onResultModalOpen);
    $manualLottoNumbersWrapper.addEventListener('focusout', (e) => {
      onAllNumberInput(e, $$lottoNumberInputs);
    });
    $correctNumberWrapper.addEventListener('focusout', (e) => {
      onAllNumberInput(e, $$correctNumberInputs);
    });
    $restartButton.addEventListener('click', onRestart);
    window.addEventListener('keyup', onModalAccessibility);
  },
};

export default controller;
