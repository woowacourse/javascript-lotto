import {
  isDividedByThousand,
  isEmptyValue,
  isPositiveValue,
} from '../utils/validator.js';
import LottoModel from '../lottoModel.js';

describe('구매 금액 유효성 검사 유틸 테스트', () => {
  test('금액이 천 단위인지 판단 할 수 있어야한다.', () => {
    const purchaseMoney = 3000;

    expect(isDividedByThousand(purchaseMoney)).toBe(true);
  });

  test('금액이 빈값인지 판단 할 수 있어야한다. ', () => {
    const purchaseMoney = '';

    expect(isEmptyValue(purchaseMoney)).toBe(true);
  });

  test('금액이 양의 정수인지 판단 할 수 있어야한다', () => {
    let purchaseMoney = -1000;

    expect(isPositiveValue(purchaseMoney)).toBe(false);

    purchaseMoney = 0;

    expect(isPositiveValue(purchaseMoney)).toBe(false);
  });
});

describe('로또 모델 테스트', () => {
  test('구입한 로또 금액만큼 로또가 구매되어야 한다.', () => {
    const lottoModel = new LottoModel();
    const lottoCount = 4;

    lottoModel.createLottoList(lottoCount);

    const lottoResult = lottoModel.lottoList;
    const isCorrectLottoLength = lottoResult.every(
      (result) => result.size === 6
    );

    expect(lottoResult).toHaveLength(lottoCount);
    expect(isCorrectLottoLength).toBe(true);
  });

  test('입력한 당첨번호와 구매한 로또의 매칭 결과를 비교할 수 있어야한다.', () => {
    const lottoModel = new LottoModel();

    const winningLottoNumbers = [1, 2, 3, 4, 5, 6];
    const winningLottoBonusNumber = [7];

    const lottoList = [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 7],
      [19, 10, 20, 21, 9, 6],
    ];

    const lottoMatchingResult = lottoModel.calcLottoMachingResult(
      winningLottoNumbers,
      winningLottoBonusNumber,
      lottoList
    );

    expect(lottoMatchingResult).toBe({
      '3개': 0,
      '4개': 0,
      '5개': 0,
      '5개+보너스볼': 1,
      '6개': 1,
    });
  });
});
