import { $ } from '../utils/dom.js';

export const getLastWinnginNumbers = () => {
  const lastWinnginNumberList = Array.from(
    document.querySelectorAll('.last-lotto-winning-number-input'),
    number => Number(number.value),
  );
  console.log(lastWinnginNumberList);
  return lastWinnginNumberList;
};

export const checkLastWinnginNumberList = lastWinnginNumberList => {};
