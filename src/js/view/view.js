import { CLASS, ID, CLASS_NAME } from '../util/constants';
import { $, $$, toggleClassName, toggleDisabled } from './dom';
import {
  getTotalWinningCount,
  totalWinningMoney,
  winningRate,
} from '../util/utils';

const checkInputRange = (numberInput) => {
  if (!numberInput.checkValidity()) {
    $(CLASS.ERROR_TEXT).classList.remove(CLASS_NAME.HIDDEN);
  }
  if (
    Array.from($$(CLASS.WINNING_NUMBER_INPUT)).every((element) =>
      element.checkValidity()
    )
  ) {
    $(CLASS.ERROR_TEXT).classList.add(CLASS_NAME.HIDDEN);
  }
};

export const moveFocusToNextNumber = () => {
  const $winningNumberInputs = $$(CLASS.WINNING_NUMBER_INPUT);
  const $bonusNumberInput = $(ID.BONUS_NUMBER_INPUT);
  $winningNumberInputs[0].focus();

  $winningNumberInputs.forEach((numberInput, index) => {
    numberInput.addEventListener('input', () => {
      checkInputRange(numberInput);
      if (numberInput.value.length === 2) {
        if (index === 5) {
          $bonusNumberInput.focus();
          return;
        }
        if (index === 6) {
          return;
        }
        $winningNumberInputs[index + 1].focus();
      }
    });
  });
};

export const toggleDisablePayment = () => {
  toggleClassName($(ID.PAYMENT_BUTTON), CLASS_NAME.DISABLED);

  toggleDisabled($(ID.PAYMENT_BUTTON));
  toggleDisabled($(ID.PAYMENT_INPUT));
};

export const generateResult = (lottoList, winningNumber, bonusNumber) => {
  const result = getTotalWinningCount(
    lottoList.getPurchasedLotto(),
    winningNumber,
    bonusNumber
  );
  const totalMoney = totalWinningMoney(result);

  $$(CLASS.WINNING_COUNT).forEach((element, index) => {
    element.textContent = `${result[index]}개`;
  });
  $(CLASS.EARNING_WEIGHT).textContent = winningRate(
    totalMoney,
    lottoList.count()
  );
};

export const toggleButton = () => {
  toggleClassName($(ID.LOTTO_LIST_TOGGLE_BUTTON), CLASS_NAME.TOGGLE_SWITCH);
  toggleClassName($(ID.LOTTO_LIST), CLASS_NAME.DIRECTION_COLUMN);

  $$(CLASS.LOTTO_NUMBER).forEach((element) => {
    toggleClassName(element, CLASS_NAME.INVISIBLE);
  });
};

export const modalClose = () => {
  $(CLASS.MODAL_BACKGROUND).classList.remove('show');
};
