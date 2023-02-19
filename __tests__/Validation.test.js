import Validation from '../src/Validation';

describe('Validation 테스트', () => {
  test.each([-1, -1000, 0.3, 11.7, 100, 1100])(
    '돈은 1000 으로 나누어 떨어지는 0 이상의 정수여야 한다',
    (money) => {
      expect(() => Validation.validateMoney(money)).toThrowError();
    },
  );

  test.each([0, 46, -3])(
    '로또 번호는 1에서 45 사이의 숫자가 아닌 경우 예외를 던져야 한다',
    (lottoNumber) => {
      expect(() => Validation.validateLottoNumber(lottoNumber)).toThrowError();
    },
  );

  test.each([
    [[1, 2, 3, 4, 5, 6], 6],
    [[1, 2, 3, 4, 5, 6], 1],
  ])('로또 번호와 보너스 번호는 중복될 수 없다.', (lottoNumbers, bonusNumber) => {
    expect(() => Validation.validateBonusNumberDistinct(lottoNumbers, bonusNumber)).toThrowError();
  });

  test.each(['Y', 'm', 'z', 'N', '1'])('재시작 명령은 y 또는 n 이어야 한다', (command) => {
    expect(() => Validation.validateRestartCommand(command)).toThrowError();
  });
});
