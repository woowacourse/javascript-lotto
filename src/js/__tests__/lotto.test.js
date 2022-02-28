import {
  MATCH_NUMBER_3_PRIZE,
  MATCH_NUMBER_4_PRIZE,
  MATCH_NUMBER_5_PRIZE,
  MATCH_NUMBER_6_PRIZE,
  MATCH_NUMBER_BONUS_PRIZE,
} from '../constants/constant.js';
import {
  calculateGameCount,
  isOverlapLottoNumber,
} from '../core/makeLottoList.js';

function getLottoPrize(correctCount) {
  let prizeMoney = 0;
  switch (correctCount) {
    case 3:
      prizeMoney = MATCH_NUMBER_3_PRIZE;
      break;
    case 4:
      prizeMoney = MATCH_NUMBER_4_PRIZE;
      break;
    case 5:
      prizeMoney = MATCH_NUMBER_5_PRIZE;
      break;
    case 6:
      prizeMoney = MATCH_NUMBER_6_PRIZE;
      break;
  }
  return prizeMoney;
}

function computeRateOfReturn(lottoInfo, lastLottoInfo) {
  let totalPrizeMoney = 0;
  lottoInfo.currentLottoNumbers.forEach(lottoNumbers => {
    const correctCount = lottoNumbers.filter(num =>
      lastLottoInfo.lastLottoNumbers.includes(num),
    ).length;
    if (
      correctCount === 5 &&
      lottoNumbers.includes(lastLottoInfo.bounsNumber)
    ) {
      totalPrizeMoney = totalPrizeMoney + MATCH_NUMBER_BONUS_PRIZE;
    }
    totalPrizeMoney = totalPrizeMoney + getLottoPrize(correctCount);
  });
  return (totalPrizeMoney / (lottoInfo.lottoCount * 1000)) * 100;
}

describe('로또와 관련된 테스트를 진행하는 곳', () => {
  test('입력 금액에 맞게 로또를 생성되는지 확인한다', () => {
    const input = 2000;
    expect(calculateGameCount(input)).toBe(2);
  });

  test('로또 번호를 생성할 때에는 중복값이 없도록 한다.', () => {
    const overLapInputNumberList = [
      [1, 2, 3, 4, 4, 5],
      [1, 2, 33, 33, 4, 5],
    ];
    overLapInputNumberList.forEach(lottoNumbers => {
      expect(isOverlapLottoNumber(lottoNumbers)).toBe(false);
    });

    const positiveInputNumberList = [
      [1, 2, 3, 4, 5, 6],
      [2, 15, 36, 42, 1, 23],
    ];
    positiveInputNumberList.forEach(lottoNumbers => {
      expect(isOverlapLottoNumber(lottoNumbers)).toBe(true);
    });
  });

  test('로또 수익률이 올바르게 계산이 되는지 확인한다.', () => {
    const lastLottoInfo = {
      lastLottoNumbers: [1, 2, 3, 4, 5, 6],
      bounsNumber: 7,
    };
    const lottoInfo = {
      lottoCount: 5,
      currentLottoNumbers: [
        [1, 2, 3, 7, 8, 9],
        [1, 2, 3, 7, 8, 9],
        [1, 2, 3, 7, 8, 9],
        [1, 2, 3, 7, 8, 9],
        [1, 2, 3, 7, 8, 9],
      ],
    };
    expect(computeRateOfReturn(lottoInfo, lastLottoInfo)).toBe(500);
  });
});
