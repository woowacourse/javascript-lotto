import Random from '../../utils/random.js';

// given
const MockRandomNumberMaker = {
  randomNumberInRange({ start, end, count }) {
    Random.pickUniqueNumbersInRange({ start, end, count });
  },
};

describe('로또 생성 테스트', () => {
  let lottoNumber;

  beforeEach(() => {
    // when
    lottoNumber = Lotto.createNumber(MockRandomNumberMaker);
  });

  test('생성된 로또 개수는 6개다', () => {
    // then
    expect(lottoNumber.length).toBe(6);
  });

  test('각 로또 번호는 1 ~ 45 사이여야 한다.', () => {
    // then
    const isValidRange = lottoNumber.every((number) => number >= 1 && number <= 45);
    expect(isValidRange).toBeTruthy();
  });

  test('각 로또 번호 중복되지 않아야 한다.', () => {
    // then
    const isDuplicated = new Set(lottoNumber).size === lottoNumber.length;
    expect(isDuplicated).toBeTruthy();
  });

  test('로또 번호는 오름차순으로 정렬되어야 한다.', () => {
    // then
    const isSorted = lottoNumber.every((num, i) => i === 0 || num >= lottoNumber[i - 1]);
    expect(isSorted).toBeTruthy();
  });
});
