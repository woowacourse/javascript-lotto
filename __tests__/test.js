import Lotto from '../src/Lotto';

test('숫자 6개를 가진 로또 1장을 발행한다.', () => {
  // given
  const lottoNumbers = [1, 2, 3, 4, 5, 6];

  // when
  const lotto = new Lotto(lottoNumbers);

  // then
  expect(lotto.getNumbers()).toHaveLength(6);
});

test.each([
  [[1, 2, 3, 4, 5, 6]], [[40, 41, 42, 43, 44, 45]],
])('로또의 번호의 숫자 범위는 1 ~ 45이다.', (lottoNumbers) => {
  // when
  const lotto = new Lotto(lottoNumbers);

  // then
  expect(lotto.getNumbers()).toHaveLength(6);
});
