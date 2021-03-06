import { ACTION_TYPE, CLASSNAME, JS_SELECTOR } from "../../constants/index.js";
import { Lotto } from "../../models/index.js";
import { $, toDataAttributeSelector as toDAS } from "../../utils/index.js";
import ResultModalPresentational from "./Presentational.js";
import { Container } from "../core/index.js";

class ResultModalContainer extends Container {
  constructor() {
    super(ResultModalPresentational);
    this.Presentational = new ResultModalPresentational({
      eventListeners: {
        restart: this.restart.bind(this),
        closeModal: this.closeModal.bind(this),
      },
    });
  }

  initalize() {
    this.WINNING_MONEY_UNITS = [2e9, 30e6, 1.5e6, 50e3, 5e3, 0];

    this.$container = $(toDAS(JS_SELECTOR.RESULT_MODAL.CONTAINER));
  }

  getEventListeners() {
    return {
      restart: this.restart.bind(this),
      closeModal: this.closeModal.bind(this),
    };
  }

  select() {
    const state = this.store.getState();
    return {
      lottos: state.lottos,
      winningNumber: state.winningNumber,
    };
  }

  render() {
    if (!this.hasChanged()) return;

    const { lottos, winningNumber } = this.currentValue;
    const isCleared = lottos.length === 0 && winningNumber.numbers.length === 0;

    if (isCleared) {
      this.Presentational.render({ isCleared: true });
      this.updateValue();
      return;
    }

    const winningCounts = this.produceWinningCount(lottos, winningNumber);
    const profitRate = this.calculateProfitRate(lottos, winningCounts);
    this.Presentational.render({ isCleared: false, winningCounts, profitRate });
    this.updateValue();
  }

  hasChanged() {
    this.currentValue = this.select();
    const { winningNumber: previousWinningNumber } = this.previousValue;
    const { winningNumber: currentWinningNumber } = this.currentValue;

    return previousWinningNumber !== currentWinningNumber;
  }

  produceWinningCount(lottos, winningNumber) {
    const winningCount = Array(this.WINNING_MONEY_UNITS.length).fill(0);

    lottos.forEach((lotto) => {
      winningCount[
        this.toWinningCountIndex(this.getMatch(lotto, winningNumber))
      ]++;
    });
    return winningCount;
  }

  getMatch(lotto, { numbers, bonusNumber }) {
    return {
      matchCount:
        lotto.numbers.length +
        numbers.length -
        new Set([...lotto.numbers, ...numbers]).size,
      isBonusMatched: lotto.numbers.includes(bonusNumber),
    };
  }

  toWinningCountIndex({ matchCount, isBonusMatched }) {
    const matchPrize = {
      6: 0,
      5: isBonusMatched ? 1 : 2,
      4: 3,
      3: 4,
    };

    if (matchCount in matchPrize === false) {
      return 5;
    }

    return matchPrize[matchCount];
  }

  calculateProfitRate(lottos, winningCounts) {
    const totalWinningMoney = [
      ...Array(this.WINNING_MONEY_UNITS.length),
    ].reduce(
      (total, _, index) =>
        total + this.WINNING_MONEY_UNITS[index] * winningCounts[index],
      0
    );

    return totalWinningMoney / (lottos.length * Lotto.UNIT_PRICE) - 1;
  }

  restart() {
    this.store.dispatch({ type: ACTION_TYPE.CLEAR });
  }

  closeModal() {
    this.$container.classList.remove(CLASSNAME.MODAL.OPEN);
  }
}

export default ResultModalContainer;
