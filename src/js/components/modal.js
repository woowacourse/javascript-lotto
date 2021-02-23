import { CLASSNAME, JS_SELECTOR, STATE_TYPE } from "../constants/index.js";
import { Lotto } from "../models/index.js";
import store from "../store/index.js";
import {
  $,
  $$,
  toClassSelector as toCS,
  toDataAttributeSelector as toDAS,
} from "../utils/index.js";

const createModal = () => {
  const WINNING_MONEY_UNITS = [2e9, 30e6, 1.5e6, 50e3, 5e3, 0];

  const $container = $(toCS(CLASSNAME.MODAL));
  const $close = $(toCS(CLASSNAME.MODAL.CLOSE));
  const $profitRateParagraph = $(
    toDAS(JS_SELECTOR.MODAL.PROFIT_RATE_PARAGRAPH)
  );
  const $$winningCounts = $$(toDAS(JS_SELECTOR.MODAL.WINNING_COUNT));

  const isRanked = {
    First: ({ matchCount }) => matchCount === 6,
    Second: ({ matchCount, isBonusMatched }) => {
      return matchCount === 5 && isBonusMatched;
    },
    Third: ({ matchCount, isBonusMatched }) => {
      return matchCount === 5 && !isBonusMatched;
    },
    Fourth: ({ matchCount }) => matchCount === 4,
    Fifth: ({ matchCount }) => matchCount === 3,
  };

  const toWinningCountIndex = (match) => {
    if (isRanked.First(match)) return 0;
    if (isRanked.Second(match)) return 1;
    if (isRanked.Third(match)) return 2;
    if (isRanked.Fourth(match)) return 3;
    if (isRanked.Fifth(match)) return 4;
    return 5;
  };

  const getMatch = (lotto, { numbers, bonusNumber }) => {
    const matchCount =
      lotto.numbers.length +
      numbers.length +
      -new Set([...lotto.numbers, ...numbers]).size;
    const isBonusMatched = lotto.numbers.includes(bonusNumber);

    return { matchCount, isBonusMatched };
  };

  const calculateProfitRate = (lottos, winningCount) => {
    const totalWinningMoney = [...Array(WINNING_MONEY_UNITS.length)].reduce(
      (total, _, index) =>
        total + WINNING_MONEY_UNITS[index] * winningCount[index],
      0
    );

    return totalWinningMoney / (lottos.length * Lotto.UNIT_PRICE) - 1;
  };

  const produceWinningCount = (lottos, winningNumber) => {
    const winningCount = Array(WINNING_MONEY_UNITS.length).fill(0);

    lottos.forEach((lotto) => {
      winningCount[toWinningCountIndex(getMatch(lotto, winningNumber))]++;
    });

    return winningCount;
  };

  const render = () => {
    const { lottos, winningNumber } = store.getState();

    const winningCount = produceWinningCount(lottos, winningNumber);
    const profitRate = calculateProfitRate(lottos, winningCount);
    const profitRateParagraph = `당신의 총 수익률은 ${profitRate.toLocaleString(
      "en-US",
      {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}입니다.`;

    [...$$winningCounts]
      .reverse()
      .forEach(($td, index) => ($td.innerText = `${winningCount[index]}개`));
    $profitRateParagraph.innerText = profitRateParagraph;
    $container.classList.add(CLASSNAME.MODAL.OPEN);
  };

  const closeModal = () => {
    $container.classList.remove(CLASSNAME.MODAL.OPEN);
  };

  const init = () => {
    $close.addEventListener("click", closeModal);
    store.subscribe(STATE_TYPE.WINNING_NUMBER, render);
  };

  return { init };
};

const Modal = createModal();

export default Modal;
