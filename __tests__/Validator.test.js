import { Validator } from '../src/domains';

describe('validateRandomNumber 기능 테스트', () => {
  test('로또 번호는 정수다.', () => {
    const INPUTS = [1.1, 's', ''];

    INPUTS.forEach((input) => {
      expect(() => Validator.validateRandomNumber(input)).toThrow();
    });
  });

  test('로또 번호의 범위는 1~45까지다.', () => {
    const NUMBERS = [0, 46];

    NUMBERS.forEach((number) => {
      expect(() => Validator.validateRandomNumber(number)).toThrow();
    });
  });
});

describe('validateLottoTickets 기능 테스트', () => {
  test('로또 번호는 정수로 이루어져야 한다.', () => {
    const LOTTOS = [
      [1, 2, 3, 4, 5, 4.5],
      [1, 2, 3, 4, 5, 's'],
      [1, 2, 3, 4, 5, ''],
    ];

    LOTTOS.forEach((lotto) => {
      expect(() => Validator.validateLottoTickets(lotto)).toThrow();
    });
  });

  test('로또 번호의 범위는 1~45까지다.', () => {
    const LOTTOS = [
      [1, 2, 3, 4, 5, 46],
      [1, 2, 3, 4, 5, 0],
    ];

    LOTTOS.forEach((lotto) => {
      expect(() => Validator.validateLottoTickets(lotto)).toThrow();
    });
  });

  test('로또 번호는 총 6개이어야 한다.', () => {
    const LOTTOS = [
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5, 6, 7],
    ];

    LOTTOS.forEach((lotto) => {
      expect(() => Validator.validateLottoTickets(lotto)).toThrow();
    });
  });

  test('로또 번호는 중복되지 않아야 한다.', () => {
    const LOTTO = [1, 2, 3, 4, 5, 5];

    expect(() => Validator.validateLottoTickets(LOTTO)).toThrow();
  });
});

describe('validateBonusNumber 기능 테스트', () => {
  test('보너스 번호는 정수로 이루어져야 한다.', () => {
    const LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];
    const BONUS_NUMBERS = [4.5, 's', ''];

    BONUS_NUMBERS.forEach((bonusNumber) => {
      expect(() =>
        Validator.validateBonusNumber(LOTTO_NUMBERS, bonusNumber),
      ).toThrow();
    });
  });

  test('보너스 번호의 범위는 1~45까지다.', () => {
    const LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];
    const BONUS_NUMBERS = [46, 0];

    BONUS_NUMBERS.forEach((bonusNumber) => {
      expect(() =>
        Validator.validateBonusNumber(LOTTO_NUMBERS, bonusNumber),
      ).toThrow();
    });
  });

  test('보너스 번호는 로또 번호와 중복되지 않아야 한다.', () => {
    const LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];
    const BONUS_NUMBER = 1;

    expect(() =>
      Validator.validateBonusNumber(LOTTO_NUMBERS, BONUS_NUMBER),
    ).toThrow();
  });
});

describe('validatePaymentAmount 기능 테스트', () => {
  test('구입 금액은 정수이어야 한다.', () => {
    const INPUTS = [1.1, 's', ''];

    INPUTS.forEach((input) => {
      expect(() => Validator.validatePaymentAmount(input)).toThrow();
    });
  });

  test('구입 가능한 로또는 최소 1장, 최대 20장이다.', () => {
    const INPUTS = [999, 20001];

    INPUTS.forEach((input) => {
      expect(() => Validator.validatePaymentAmount(input)).toThrow();
    });
  });

  test('구입 금액은 1000원 단위로 나누어 떨어져야 한다.', () => {
    const INPUTS = [1500, 1001];

    INPUTS.forEach((input) => {
      expect(() => Validator.validatePaymentAmount(input)).toThrow();
    });
  });
});
