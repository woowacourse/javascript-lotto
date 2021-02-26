import { VALUE } from './constants.js';

export const $ = (selector) => document.querySelector(selector);
export const $all = (selector) => [...document.querySelectorAll(selector)];

export const createElement = (tagName, className, text = '') => {
  const $element = document.createElement(tagName);
  $element.className = className;
  $element.append(text);
  return $element;
};

export const getRandomNumberArray = (min, max, length) => {
  const numberArray = [];

  while (numberArray.length < length) {
    const number = Math.floor(Math.random() * (max - min + 1) + min);

    if (numberArray.includes(number)) continue;
    numberArray.push(number);
  }

  return numberArray;
};

export const isUniqueArray = (array) => {
  return array.length === new Set(array).size;
};

export const showElement = ($element) => {
  $element.classList.remove('hidden');
};

export const hideElement = ($element) => {
  $element.classList.add('hidden');
};

export const enableElement = ($element) => {
  $element.disabled = false;
};

export const disableElement = ($element) => {
  $element.disabled = true;
};

export const getMatchCount = (array1, array2) => {
  const set = new Set([...array1, ...array2]);
  return array1.length + array2.length - set.size;
};

export const getPriceByRank = (rank = VALUE.RANK.LOSE) => {
  const price = {
    [VALUE.RANK.FIRST]: VALUE.WINNING_PRICE.FIRST,
    [VALUE.RANK.SECOND]: VALUE.WINNING_PRICE.SECOND,
    [VALUE.RANK.THIRD]: VALUE.WINNING_PRICE.THIRD,
    [VALUE.RANK.FOURTH]: VALUE.WINNING_PRICE.FOURTH,
    [VALUE.RANK.FIFTH]: VALUE.WINNING_PRICE.FIFTH,
    [VALUE.RANK.LOSE]: VALUE.WINNING_PRICE.LOSE,
  }

  return price[rank];
};

export const getRankByMatchCount = (matchCount = VALUE.MATCHED_COUNT.ZERO) => {
  const rank = {
    [VALUE.MATCHED_COUNT.SIX]: [VALUE.RANK.FIRST],
    [VALUE.MATCHED_COUNT.FIVE]: [VALUE.RANK.THIRD],
    [VALUE.MATCHED_COUNT.FOUR]: [VALUE.RANK.FOURTH],
    [VALUE.MATCHED_COUNT.THREE]: [VALUE.RANK.FIFTH],
    [VALUE.MATCHED_COUNT.TWO]: [VALUE.RANK.LOSE],
    [VALUE.MATCHED_COUNT.ONE]: [VALUE.RANK.LOSE],
    [VALUE.MATCHED_COUNT.ZERO]: [VALUE.RANK.LOSE]
  }

  return rank[matchCount];
}