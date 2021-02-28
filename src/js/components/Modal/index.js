import { ACTION_TYPE, CLASSNAME } from "../../constants/index.js";
import { Lotto } from "../../models/index.js";
import store from "../../store/index.js";
import { $, toClassSelector as toCS } from "../../utils/index.js";
import Presentaional from "./Presentational.js";

const createModal = () => {
  const WINNING_MONEY_UNITS = [2e9, 30e6, 1.5e6, 50e3, 5e3, 0];

  const $container = $(toCS(CLASSNAME.MODAL));

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

  const calculateProfitRate = (lottos, winningCounts) => {
    const totalWinningMoney = [...Array(WINNING_MONEY_UNITS.length)].reduce(
      (total, _, index) =>
        total + WINNING_MONEY_UNITS[index] * winningCounts[index],
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

  const select = (state) => ({
    lottos: state.lottos,
    winningNumber: state.winningNumber,
  });

  let currentValue = select(store.getState());

  const render = () => {
    let previousValue = currentValue;
    currentValue = select(store.getState());
    const { winningNumber: previousWinningNumber } = previousValue;
    const {
      lottos: currentLottos,
      winningNumber: currentWinningNumber,
    } = currentValue;

    const hasChanged = previousWinningNumber !== currentWinningNumber;

    if (!hasChanged) return;

    const isCleared =
      currentLottos.length === 0 && currentWinningNumber.numbers.length === 0;

    if (isCleared) {
      Presentaional.render({ isCleared: true });
      return;
    }

    const winningCounts = produceWinningCount(
      currentLottos,
      currentWinningNumber
    );
    const profitRate = calculateProfitRate(currentLottos, winningCounts);

    Presentaional.render({ isCleared: false, winningCounts, profitRate });
  };

  const restart = () => {
    store.dispatch({ type: ACTION_TYPE.CLEAR });
  };

  const closeModal = () => {
    $container.classList.remove(CLASSNAME.MODAL.OPEN);
  };

  const init = () => {
    Presentaional.init({ closeModal, restart });

    store.subscribe(render);
  };

  return { init };
};

const Modal = createModal();

export default Modal;
