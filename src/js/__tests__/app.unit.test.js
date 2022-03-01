import {
  isDividedByThousand,
  isEmptyValue,
  isPositiveValue,
} from '../utils/validator.js';
import LottoModel from '../lottoModel.js';

test('금액은 천 단위로 입력해야 한다', () => {
  const purchaseMoney = 3000;

  expect(isDividedByThousand(purchaseMoney)).toBe(true);
});

test('금액은 빈값으로 입력할 수 없다 ', () => {
  const purchaseMoney = '';

  expect(isEmptyValue(purchaseMoney)).toBe(true);
});

test('금액은 양의 정수를 입력해야한다', () => {
  let purchaseMoney = -1000;

  expect(isPositiveValue(purchaseMoney)).toBe(false);

  purchaseMoney = 0;

  expect(isPositiveValue(purchaseMoney)).toBe(false);
});

test('구입한 로또 금액만큼 로또 개수를 확인할 수 있어야 한다', () => {
  const lottoModel = new LottoModel();
  const lottoCount = 4;

  lottoModel.createLottoList(lottoCount);

  const lottoResult = lottoModel.lottoList;
  const isCorrectLottoLength = lottoResult.every((result) => result.size === 6);

  expect(lottoResult).toHaveLength(lottoCount);
  expect(isCorrectLottoLength).toBe(true);
});
