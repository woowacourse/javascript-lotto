import { LOTTO_SETTING } from '../constants/setting';
import { getListDuplicateCount } from '../utils/data-manager';
import LottosModel from '../models/LottosModel';

const winningNumberList = [1, 2, 3, 4, 5, 6];
const bonusNumber = 7;

function isBonusWinner(lottoNumberList, matchCount) {
  const bonusWinnerRange = LOTTO_SETTING.LOTTO_NUMBER_LENGTH - LOTTO_SETTING.BONUS_NUMBER_LENGTH;
  return matchCount === bonusWinnerRange && lottoNumberList.includes(bonusNumber);
}

function getRankNumber(lottoNumberList) {
  const RACKING_START_NUMBER = 5;
  const WINNING_MIN_NUMBER = 3;

  const matchCount = getListDuplicateCount(lottoNumberList, winningNumberList);
  const rankNumber = RACKING_START_NUMBER + WINNING_MIN_NUMBER - matchCount;

  if (isBonusWinner(lottoNumberList, matchCount)) {
    return 2;
  }

  if (LOTTO_SETTING.LOTTO_NUMBER_LENGTH === matchCount) {
    return 1;
  }

  return rankNumber;
}

it('일치하는 로또 번호가 3개일 때 5등이 되어야 한다.', () => {
  const lottoNumberList = [1, 2, 3, 10, 11, 12];

  expect(getRankNumber(lottoNumberList)).toBe(5);
});

it('일치하는 로또 번호가 4개일 때 4등이 되어야 한다.', () => {
  const lottoNumberList = [1, 2, 3, 4, 11, 12];
  expect(getRankNumber(lottoNumberList)).toBe(4);
});

it('일치하는 로또 번호가 5개일 때 3등이 되어야 한다.', () => {
  const lottoNumberList = [1, 2, 3, 4, 5, 12];
  expect(getRankNumber(lottoNumberList)).toBe(3);
});

it('일치하는 로또 번호가 5개이고, 보너스 번호가 동일할 때 2등이 되어야 한다.', () => {
  const lottoNumberList = [1, 2, 3, 4, 5, 7];
  expect(getRankNumber(lottoNumberList)).toBe(2);
});

it('일치하는 로또 번호가 6개일 때 1등이 되어야 한다.', () => {
  const lottoNumberList = [1, 2, 3, 4, 5, 6];
  expect(getRankNumber(lottoNumberList)).toBe(1);
});
