import { $costInput, $modal } from './elements.js';
import { MESSAGE } from './constants.js';
import validator from './lotto/validator.js';
import lottoGameController from './lotto/controller.js';

const onCostSumbit = () => {
  const cost = Number($costInput.value);
  if (validator.isMoneyLessThanMinCost(cost)) {
    alert(MESSAGE.SHOULD_EXCEED_MIN_COST);
    return;
  }
  if (validator.isChangeMoneyExist(cost)) {
    alert(MESSAGE.getShouldNotHaveChangeMessage(cost));
    return;
  }
  lottoGameController.purchaseLottoItems(cost);
};

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

export { onCostSumbit, onModalShow, onModalClose };
