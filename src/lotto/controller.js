import LottoGame from './LottoGame.js';
import lottoGameView from './view.js';
import { getProfitRate } from '../utils/calculate.js';
import { getKRString } from '../utils/format.js';
import { LOTTO } from '../constants.js';
import {
  $resultModalOpenButton,
  $costSubmitButton,
  $costSubmitForm,
  $lottoNumbersToggleButton,
  $costInput,
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
  lottoGameView.resetToggleButton();
  purchaseLottoItems(cost);
};

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

const controller = {
  bindLottoGameEvents() {
    $costSubmitForm.addEventListener('submit', onCostSubmit);
    $costSubmitButton.addEventListener('click', onCostSubmit);
    $lottoNumbersToggleButton.addEventListener('change', onShowLottoNumbersToggle);
    $modalClose.addEventListener('click', onResultModalClose);
    $correctNumberInputForm.addEventListener('submit', onResultModalOpen);
    $resultModalOpenButton.addEventListener('click', onResultModalOpen);
    $correctNumberWrapper.addEventListener('focusout', onCorrectNumberInput);
    $restartButton.addEventListener('click', onRestart);
  },
};

export default controller;
