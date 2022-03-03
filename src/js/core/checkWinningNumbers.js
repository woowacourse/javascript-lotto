import { $ } from '../utils/dom.js';

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
    window.alert('정수 값만 입력가능합니다.');
    return;
  }
  if (!isElementsValidRange(winnginNumberList)) {
    window.alert('1~45의 값만 입력가능합니다.');
    return;
  }
  if (!isElementsUnique(winnginNumberList)) {
    window.alert('값이 중복되지 않아야 합니다.');
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
