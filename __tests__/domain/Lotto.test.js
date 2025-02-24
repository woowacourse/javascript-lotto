import Lotto from '../../src/domain/Lotto.js';

describe('Lotto 클래스 테스트', () => {
  let lotto;

  beforeEach(() => {
    lotto = new Lotto([1, 2, 3, 4, 5, 6]);
  });

  test('Lotto 클래스를 초기화했을 때, 로또 객체가 잘 생성된다', () => {
    expect(lotto.numbers).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('입력해서 생성한 로또 객체에 보너스 번호가 포함되어 있으면 true를 반환한다', () => {
    expect(lotto.hasBonusNumber(1)).toBe(true);
  });

  test('입력해서 생성한 로또 객체에 보너스 번호가 포함되어 있지 않으면 false를 반환한다', () => {
    expect(lotto.hasBonusNumber(10)).toBe(false);
  });
});
