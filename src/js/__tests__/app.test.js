// - [] 번호 보기 토글 버튼을 클릭해 로또 번호를 볼 수 있어야 한다.

// e2e 테스트
// test('구입할 금액을 입력하면, 로또 구매 갯수를 확인할 수 있다.', () => {
//
// })

// unit 테스트
// [] 로또 번호 생성 함수
import {
  isDividedByThousand,
  isEmptyValue,
  isPositiveValue,
} from '../utils/validator.js';

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
})


function generateLotto() {
  const lottoNum = new Set();

  while (lottoNum.size < 6) {
    lottoNum.add(generateRandomNum());
  }

  return lottoNum;
}

function generateRandomNum() {
  return Math.floor(Math.random() * (45 - 2)) + 1;
}

// [] 로또 번호 생성 함수
test('구입한 로또 금액만큼 로또 개수를 확인할 수 있어야 한다', () => {
  const lottoCount = 4;
  const lottoResult = Array.from({ length: lottoCount }).map(() => generateLotto());
  const isCorrectLottoLength = lottoResult.every((result) => result.size === 6);

  expect(lottoResult).toHaveLength(lottoCount);
  expect(isCorrectLottoLength).toBe(true);
})

