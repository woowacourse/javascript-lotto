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
  if (!isElementsInteger(winnginNumberList)) {
    window.alert(NOT_INTEGER_ERROR);
    return;
  }
  if (!isElementsValidRange(winnginNumberList)) {
    window.alert(NOT_VALID_RANGE_ERROR);
    return;
  }
  if (!isElementsUnique(winnginNumberList)) {
    window.alert(NOT_UNIQUE_NUMBER_ERROR);
    return;
  }
  return winnginNumberList;
};

const isElementsInteger = numberList => {
  return numberList.every(number => Number.isInteger(number));
};

const isElementsValidRange = numberList => {
  return numberList.every(number => number >= 1 && number <= 45);
};

const isElementsUnique = numberList => {
  return numberList.length === new Set(numberList).size;
};
