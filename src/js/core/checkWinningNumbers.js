import {
  NOT_INTEGER_ERROR,
  NOT_VALID_RANGE_ERROR,
  NOT_UNIQUE_NUMBER_ERROR,
} from '../constants/errorMessage.js';

export const getWinningNumbers = () => {
  const winnginNumberList = Array.from(
    document.querySelectorAll('.winning-number-input'),
    number => Number(number.value),
  );
  console.log(winnginNumberList);
  return winnginNumberList;
};

export const checkWinningNumberList = winnginNumberList => {
  if (isWinningNumberListError(winnginNumberList)) {
    return;
  }
  return winnginNumberList;
};

const isWinningNumberListError = winnginNumberList => {
  if (!isElementsInteger(winnginNumberList)) {
    window.alert(NOT_INTEGER_ERROR);
    return true;
  }
  if (!isElementsValidRange(winnginNumberList)) {
    window.alert(NOT_VALID_RANGE_ERROR);
    return true;
  }
  if (!isElementsUnique(winnginNumberList)) {
    window.alert(NOT_UNIQUE_NUMBER_ERROR);
    return true;
  }
}

const isElementsInteger = numberList => {
  return numberList.every(number => Number.isInteger(number));
};

const isElementsValidRange = numberList => {
  return numberList.every(number => number >= 1 && number <= 45);
};

const isElementsUnique = numberList => {
  return numberList.length === new Set(numberList).size;
};
