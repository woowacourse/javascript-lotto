import { ACTION_TYPE } from "../../constants/index.js";
import { Lotto } from "../../models/index.js";
import store from "../../store/index.js";
import Presentaional from "./Presentational.js";

const WINNING_MONEY_UNITS = [2e9, 30e6, 1.5e6, 50e3, 5e3, 0];

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
  return {
    matchCount:
      lotto.numbers.length +
      numbers.length -
      new Set([...lotto.numbers, ...numbers]).size,
    isBonusMatched: lotto.numbers.includes(bonusNumber),
  };
};

const produceWinningCount = (lottos, winningNumber) => {
  return lottos
    .map((lotto) => getMatch(lotto, winningNumber))
    .map((match) => toWinningCountIndex(match))
    .reduce((winningCount, index) => {
      winningCount[index] += 1;
      return winningCount;
    }, Array(WINNING_MONEY_UNITS.length).fill(0));
};

const calculateProfitRate = (winningCounts, investment) => {
  const totalWinningMoney = Array.from({
    length: WINNING_MONEY_UNITS.length,
  }).reduce((total, _, index) => {
    return total + WINNING_MONEY_UNITS[index] * winningCounts[index];
  }, 0);

  return totalWinningMoney / investment - 1;
};

const select = (state) => state.winningNumber;

const createModal = () => {
  const handleStateChange = () => {
    const { lottos, winningNumber } = store.getState();
    const isCleared = winningNumber.numbers.length === 0;

    if (isCleared) {
      Presentaional.render({ isCleared: true });
      return;
    }

    const winningCounts = produceWinningCount(lottos, winningNumber);
    const investment = lottos.length * Lotto.UNIT_PRICE;
    const profitRate = calculateProfitRate(winningCounts, investment);

    Presentaional.render({ winningCounts, profitRate });
  };

  const createActionClear = () => {
    store.dispatch({ type: ACTION_TYPE.CLEAR });
  };

  const init = () => {
    Presentaional.init(createActionClear);

    store.subscribe(
      handleStateChange,
      (prev, curr) => select(prev) !== select(curr)
    );
  };

  return { init };
};

const Modal = createModal();

export default Modal;
