import Lotto from '../src/domain/Lotto';
import Validator from '../src/domain/Validator';

describe('Lotto 클래스 테스트', () => {
  test('로또 객체를 생성하면 로또 번호가 저장된다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    expect(lotto.getLottoNumber()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('로또 번호는 6자리이다.', () => {
    expect(() => {
      Validator.validateLottoNumberLength([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow('[ERROR]');
  });

  test('로또 번호는 서로 중복되지 않는다.', () => {
    expect(() => {
      Validator.validateLottoNumberDuplicated([1, 2, 3, 4, 5, 5]);
    }).toThrow('[ERROR]');
  });

  test('로또 번호는 1~45 사이의 숫자여야 한다.', () => {
    expect(() => {
      Validator.validateLottoNumberRange([100, 2, 3, 4, 5, 6]);
    }).toThrow('[ERROR]');
  });
});
