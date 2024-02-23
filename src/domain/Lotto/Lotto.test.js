import Lotto from './Lotto.js';

describe('로또 생성 테스트', () => {
  // given
  let lottoNumbers;

  beforeEach(() => {
    const lotto = new Lotto();

    // when
    lottoNumbers = lotto.createNumbers();
  });

  test('생성된 로또 번호는 6개다', () => {
    // then
    expect(lottoNumbers.length).toBe(6);
  });

  test('로또 번호는 1 ~ 45 사이여야 한다.', () => {
    // then
    const isValidRange = lottoNumbers.every((number) => number >= 1 && number <= 45);
    expect(isValidRange).toBeTruthy();
  });

  test('로또 번호는 서로 중복되지 않아야 한다.', () => {
    // then
    const isDuplicated = new Set(lottoNumbers).size === lottoNumbers.length;
    expect(isDuplicated).toBeTruthy();
  });

  test('로또 번호는 오름차순으로 정렬되어야 한다.', () => {
    // then
    const isSorted = lottoNumbers.every((num, i) => i === 0 || num >= lottoNumbers[i - 1]);
    expect(isSorted).toBeTruthy();
  });
});
