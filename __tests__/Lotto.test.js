import Lotto from '../src/domains/Lotto';

describe('Lotto 유효성 검사 테스트', () => {
  test.each([
    [1, 2, 3, 4, 5, 0],
    [1, 2, 3, 4, 5, 46],
  ])('로또 번호는 1~45 사이만 가능하다.', (numbers) => {
    // then
    expect(() => new Lotto(numbers)).toThrow();
  });

  test.each([
    [
      [1, 2, 3, 4, 5, 's'],
      [1, 2, 3, 4, 5, 4.5],
    ],
  ])('로또 번호는 정수로 이루어져야 한다.', (numbers) => {
    // then
    expect(() => new Lotto(numbers)).toThrow();
  });

  test.each([
    [
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5, 6, 7],
    ],
  ])('로또 번호는 총 6개이어야 한다.', (numbers) => {
    // then
    expect(() => new Lotto(numbers)).toThrow();
  });

  test('유효성 검사를 통과한 번호들은 저장된다.', () => {
    // given
    const NUMBERS = [1, 2, 3, 4, 5, 6];

    // when
    const lotto = new Lotto(NUMBERS);

    // then
    expect(lotto.numbers).toEqual(NUMBERS);
  });
});

describe('Lotto 기능 테스트', () => {
  // given
  const LOTTO_NUBMERS = [1, 2, 3, 4, 5, 6];

  // when
  const lotto = new Lotto(LOTTO_NUBMERS);

  test('매개변수로 전달된 수가 번호에 포함되어 있는지 여부를 반환한다.', () => {
    // given
    const INCLUDED_NUMBER = 6;

    // then
    expect(lotto.has(INCLUDED_NUMBER)).toBeTruthy();
  });

  test('매개변수로 전달된 수가 번호에 포함되어 있는지 여부를 반환한다.', () => {
    // given
    const UNINCLUDED_NUMBER = 7;

    // then
    expect(lotto.has(UNINCLUDED_NUMBER)).toBeFalsy();
  });
});
