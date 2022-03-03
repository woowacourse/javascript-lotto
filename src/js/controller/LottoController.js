import { $, $$ } from '../utils/dom';
import {
  ERROR_MESSAGE,
  LOTTO_PRICE,
  WINNING_RANK_SIZE,
  MATCHED_COUNT,
  LOTTO_INDEX,
  PRIZE,
} from './constants';
import { isValidMoneyInput, isDuplicatedLottos } from './validator';
import Lotto from '../model/Lotto';
import { showResult, toggleNumberDetail } from '../view/lottoView';
import { maxLengthHandler } from '../utils/maxLengthHandler';
import { showWinnerModal, closeModal } from '../view/modalView';

export default class LottoController {
  constructor() {
    this.lottos = [];
    this.winningLottos = [];
    $('.purchase-form').addEventListener('submit', this.purchaseHandler);
    $('.cm-toggle').addEventListener('click', toggleNumberDetail);
    $('.winning-numbers-form').addEventListener('submit', this.winningLottoHandler);
    $$('.winning-numbers').forEach(input => input.addEventListener('input', maxLengthHandler));
    $('.modal-closer').addEventListener('click', closeModal);
  }

  getLottos = (moneyInput) => {
    const numberOfLottos = parseInt(moneyInput / LOTTO_PRICE);
    for (let i = 0; i < numberOfLottos; i += 1) {
      this.lottos.push(new Lotto());
    }
  }

  purchaseHandler = e => {
    e.preventDefault();
    const moneyInput = Number($('.money-input').value);

    if (!isValidMoneyInput(moneyInput)) {
      alert(ERROR_MESSAGE.INVALID_MONEY_INPUT);
      return;
    }
    this.getLottos(moneyInput);
    showResult(this.lottos);
  }

  getHowManyMatched = lotto => {
    let matchedCount = 0;

    this.winningLottos.forEach((winningNumber, index) => {
      if (index === LOTTO_INDEX.BONUS) return;
      if (lotto.find(number => number === winningNumber)) {
        matchedCount += 1;
      }
    });
    return matchedCount;
  }

  saveMatchedCount = () => {
    this.lottos.forEach(lotto => {
      const matchedCount = this.getHowManyMatched(lotto.lottoNumbers);
      if (matchedCount >= MATCHED_COUNT.MIN) {
        lotto.matchedCount = matchedCount;
      }
    });
  }

  isSecondPlace = winner => {
    return winner.matchedCount === MATCHED_COUNT.FIVE_MATCHED
           && winner.lottoNumbers.find(number => number === this.winningLottos[LOTTO_INDEX.BONUS]);
  }

  isFirstPlace = matchedCount => matchedCount === MATCHED_COUNT.SIX_MATCHED;

  getWinnerStatistic = () => {
    const winnerStatistic = new Array(WINNING_RANK_SIZE).fill(0);
    const winners = this.lottos.filter(lotto => lotto.matchedCount >= MATCHED_COUNT.MIN);

    winners.forEach(winner => {
      if (this.isSecondPlace(winner) || this.isFirstPlace(winner.matchedCount)) {
        winnerStatistic[winner.matchedCount - 2] += 1;
        return;
      }
      winnerStatistic[winner.matchedCount - 3] += 1;
    });
    return winnerStatistic;
  }

  getEarningsRate = winnerStatistic => {
    const cost = Number($('.money-input').value);
    const prizes = [
      PRIZE.FIFTH_PLACE,
      PRIZE.FOURTH_PLACE,
      PRIZE.THIRD_PLACE,
      PRIZE.SEONCD_PLACE,
      PRIZE.FIRST_PLACE
    ];
    const profit = winnerStatistic.reduce((sum, currentPrize, index) => {
      return sum + currentPrize * prizes[index];
    });
    return Math.round(profit / cost * 100);
  }

  winningLottoHandler = e => {
    e.preventDefault();
    const winningNumbers = Array.prototype.slice.call($$('.winning-numbers')).map(input => input.value);

    if (isDuplicatedLottos(winningNumbers)) {
      alert(ERROR_MESSAGE.DUPLICATED_WINNING_INPUT);
      return;
    }
    this.winningLottos = winningNumbers.map(number => +number);
    this.saveMatchedCount();
    const winnerStatistic = this.getWinnerStatistic();
    const earningsRate = this.getEarningsRate(winnerStatistic);
    showWinnerModal(winnerStatistic, earningsRate);
  }
}
