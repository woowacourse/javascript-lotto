import { lottoGame } from '../store.js';
import {$costSubmitButton, $costSubmitForm, $lottoNumbersToggleButton, $costInput} from "../elements.js";
import {
  LOTTO_PRICE,
  NUMBER_LIST_LENGTH,
  MIN_NUMBER,
  MAX_NUMBER,
} from '../constants.js';
import lottoGameView from './view.js';
import validator from './validator.js';
import { MESSAGE } from "../constants.js";

const addLottoItems = (lottoItemCount) => {
  for (let i = 0; i < lottoItemCount; i += 1) {
    lottoGame.addLottoItem();
  }
};

const purchaseLottoItems = (cost) => {
  const lottoItemCount = cost / LOTTO_PRICE;
  lottoGame.initLottoItemList();
  addLottoItems(lottoItemCount);
  lottoGameView.renderResult(lottoGame.lottoItemList);
}

const toggleLottoItemNumbers = (checked) => {
  if (checked) {
    lottoGameView.displayLottoNumbers();
    return;
  }
  lottoGameView.hideLottoNumbers();
}

const initToggleButton = () => {
  lottoGameView.resetToggleButton();
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
  initToggleButton();
  purchaseLottoItems(cost);
};

const onShowLottoNumbersToggle = (e) => {
  toggleLottoItemNumbers(e.target.checked);
};

export default {
  addAllEventListener(){
    $costSubmitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      onCostSumbit();
    })
    $costSubmitButton.addEventListener('click', onCostSumbit);
    $lottoNumbersToggleButton.addEventListener('click', onShowLottoNumbersToggle);
  }
};