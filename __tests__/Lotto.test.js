import Lotto from '../src/domain/object/Lotto';
import Validator from '../src/domain/Validator';

describe('Lotto 클래스 테스트', () => {
  test('로또 객체를 생성하면 로또 번호가 저장된다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    expect(lotto.getLottoNumber()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('로또 번호 배열은 중복되지 않는 6자리여야 하고, 각 숫자는 1~45 사이의 숫자여야 한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6]);
      return true;
    }).toBeTruthy();
  });

  test('로또 번호는 6자리가 아닐 경우 에러가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow('[ERROR]');
  });

  test('로또 번호 중 중복되는 숫자가 있을 경우 에러가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow('[ERROR]');
  });

  test('로또 번호 중 1~45 사이의 숫자가 아닐 경우 에러가 발생한다.', () => {
    expect(() => {
      Validator.validateLottoNumberRange([46, 2, 3, 4, 5, 6]);
    }).toThrow('[ERROR]');
  });
});
