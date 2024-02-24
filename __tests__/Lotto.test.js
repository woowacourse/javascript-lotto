import Lotto from '../src/Domain/Lotto';

describe('6개의 숫자를 관리하는 로또 클래스 테스트', () => {
  test('정상적으로 6개의 숫자를 가진 배열이 입력 되면, 해당 값을 필드 값으로 가질 수 있다.', () => {
    const validInput = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto(validInput);
    expect(lotto.getLottoNumbers()).toEqual(validInput);
  });

  test('중복 된 숫자를 가진 배열이 Lotto 클래스의 인스턴스가 된다면 예외처리 한다.', () => {
    const invalidInput = [1, 2, 2, 4, 5, 6];
    expect(() => new Lotto(invalidInput)).toThrow();
  });

  test.each([
    [
      [0, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 46],
    ],
  ])('1 이상 45 이하가 아닌 번호가 Lotto 클래스의 인스턴스가 됐을 시에 예외 처리한다.', (invalidInput) => {
    expect(() => new Lotto(invalidInput)).toThrow();
  });
});
