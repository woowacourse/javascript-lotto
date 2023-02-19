import Validation from '../src/Validation';

describe('Validation', () => {
  context('돈이 1000 으로 나누어 떨어지지 않을 때', () => {
    it.each([0.3, 11.7, 100, 1100])('%p → 예외를 던져야 한다.', (money) => {
      expect(() => Validation.validateMoney(money)).toThrowError();
    });
  });

  context('돈이 음수일 때', () => {
    it.each([-1, -1000, -0.1])('%p → 예외를 던져야 한다.', (money) => {
      expect(() => Validation.validateMoney(money)).toThrowError();
    });
  });

  context('로또 번호가 1에서 45 사이의 숫자가 아닌 경우', () => {
    it.each([0, 46, -3])('%p → 예외를 던져야 한다.', (lottNumber) => {
      expect(() => Validation.validateLottoNumber(lottoNumber)).toThrowError();
    });
  });

  context('로또 번호와 보너스 번호가 중복될 때', () => {
    it.each([
      { lottoNumbers: [1, 2, 3, 4, 5, 6], bonusNumber: 6 },
      { lottoNumbers: [1, 2, 3, 4, 5, 6], bonusNumber: 1 },
    ])(
      '로또 번호: $lottoNumbers, 보너스 번호: $bonusNumber → 예외를 던져야 한다.',
      ({ lottoNumbers, bonusNumber }) => {
        expect(() =>
          Validation.validateBonusNumberDistinct(lottoNumbers, bonusNumber),
        ).toThrowError();
      },
    );
  });

  context('재시작 명령으로 "y", "n" 이외의 값을 받았을 때', () => {
    it.each(['Y', 'm', 'z', 'N', '1'])('%p → 예외를 던져야 한다.', ({ command }) => {
      expect(() => Validation.validateRestartCommand(command)).toThrowError();
    });
  });
});
