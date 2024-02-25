import {
  isDivisibleByPrice,
  isLottoNumberInRange,
  isLottoNumbersInRange,
  isNotDuplicatedLottoNumber,
  isNotInLottoNumber,
  isValidLottoNumberCount,
  isValidNumbersOfTickets,
  isValidRestartInputForm,
  isValidWinningNumbersForm,
} from '../src/domains/validator/validators';
import { isInteger, isIntegers } from '../src/utils';

describe('당첨 번호 유효성 검사 기능 테스트', () => {
  test.each(['1/2/3/4/5/6', '1 2 3 4 5 6'])(
    "isValidWinningNumbersForm - 구분자가 쉼표(,)가 아닐 경우 false를 반환한다. '%s'",
    (input) => {
      expect(isValidWinningNumbersForm(input)).toBeFalsy();
    },
  );

  test('isValidWinningNumbersForm - 구분자가 쉼표(,)일 경우 true를 반환한다.', () => {
    const INPUT = '1,2,3,4,5,6';

    expect(isValidWinningNumbersForm(INPUT)).toBeTruthy();
  });

  test.each([[[1, 2, 3, 4, 5, 4.5]], [[1, 2, 3, 4, 5, 's']]])(
    'isIntegers - 정수 배열이 아니라면 false를 반환한다. %s',
    (numbers) => {
      expect(isIntegers(numbers)).toBeFalsy();
    },
  );

  test('isIntegers - 정수 배열은 true를 반환한다.', () => {
    const NUMBERS = [1, 2, 3, 4, 5, 6];

    expect(isIntegers(NUMBERS)).toBeTruthy();
  });

  test.each([[[1, 2, 3, 4, 5, 46]], [[1, 2, 3, 4, 5, 0]]])(
    'isLottoNumbersInRange - 로또 번호의 범위가 1~45를 초과할 경우 false를 반환한다. %s',
    (numbers) => {
      expect(isLottoNumbersInRange(numbers)).toBeFalsy();
    },
  );

  test('isLottoNumbersInRange - 로또 번호의 범위가 1~45인 경우 true를 반환한다.', () => {
    const NUMBERS = [1, 2, 3, 4, 5, 45];

    expect(isLottoNumbersInRange(NUMBERS)).toBeTruthy();
  });

  test.each([[[1, 2, 3, 4, 5]], [[1, 2, 3, 4, 5, 6, 7]]])(
    'isValidLottoNumberCount - 로또 번호 배열의 인자가 총 6개가 아닌 경우 false를 반환한다. %s',
    (numbers) => {
      expect(isValidLottoNumberCount(numbers)).toBeFalsy();
    },
  );

  test('isValidLottoNumberCount - 로또 번호 배열의 인자가 총 6개인 경우 true를 반환한다.', () => {
    const NUMBERS = [1, 2, 3, 4, 5, 6];
    expect(isValidLottoNumberCount(NUMBERS)).toBeTruthy();
  });

  test('isNotDuplicatedLottoNumber - 중복된 번호가 있다면 false를 반환한다.', () => {
    const NUMBERS = [1, 2, 3, 4, 5, 5];

    expect(isNotDuplicatedLottoNumber(NUMBERS)).toBeFalsy();
  });

  test('isNotDuplicatedLottoNumber - 중복된 번호가 없다면 true를 반환한다.', () => {
    const NUMBERS = [1, 2, 3, 4, 5, 6];

    expect(isNotDuplicatedLottoNumber(NUMBERS)).toBeTruthy();
  });
});

describe('보너스 번호 유효성 검사 기능 테스트', () => {
  test.each(['s', ' ', 1.2])(
    'isInteger - 정수가 아니라면 false를 반환한다. %s',
    (number) => {
      expect(isInteger(number)).toBeFalsy();
    },
  );

  test.each([1, 2])('isInteger - 정수가라면 true를 반환한다. %s', (number) => {
    expect(isInteger(number)).toBeTruthy();
  });

  test.each([46, 0])(
    'isLottoNumberInRange - 보너스 번호의 범위가 1~45를 초과할 경우 false를 반환한다. %s',
    (numbers) => {
      expect(isLottoNumberInRange(numbers)).toBeFalsy();
    },
  );

  test.each([1, 45])(
    'isLottoNumberInRange - 보너스 번호의 범위가 1~45인 경우 true를 반환한다. %s',
    (numbers) => {
      expect(isLottoNumberInRange(numbers)).toBeTruthy();
    },
  );

  test('isNotInLottoNumber - 이미 로또 번호에 존재하는 숫자인 경우 false를 반환한다.', () => {
    const LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];
    const BONUS_NUMBER = 1;

    expect(isNotInLottoNumber(LOTTO_NUMBERS, BONUS_NUMBER)).toBeFalsy();
  });

  test('isNotInLottoNumber - 로또 번호에 존재하지 않는 숫자인 경우 true를 반환한다.', () => {
    const LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];
    const BONUS_NUMBER = 7;

    expect(isNotInLottoNumber(LOTTO_NUMBERS, BONUS_NUMBER)).toBeTruthy();
  });
});

describe('checkPaymentAmount 기능 테스트', () => {
  test.each([1.1, 's', ''])(
    'isInteger - 정수가 아니라면 false를 반환한다. %s',
    (number) => {
      expect(isInteger(number)).toBeFalsy();
    },
  );

  test('isInteger - 정수라면 true를 반환한다.', () => {
    const PAYMENT_AMOUNT = 1000;

    expect(isInteger(PAYMENT_AMOUNT)).toBeTruthy();
  });

  test.each([['999', '20001']])(
    'isValidNumbersOfTickets - 구입 로또 개수가 1~50장을 초과할 경우 false를 반환한다. %s',
    (input) => {
      expect(isValidNumbersOfTickets(input)).toBeFalsy();
    },
  );

  test.each([['1000', '50000']])(
    'isValidNumbersOfTickets - 구입 로또 개수가 1~50장인 경우 true를 반환한다. %s',
    (input) => {
      expect(isValidNumbersOfTickets(input)).toBeTruthy();
    },
  );

  test.each(['1500', '1001'])(
    'isDivisibleByPrice - 구입 금액이 1000원 단위로 나누어 떨어지지 않으면 false를 반환한다. %s',
    (input) => {
      expect(isDivisibleByPrice(input)).toBeFalsy();
    },
  );

  test.each(['1000', '50000'])(
    'isDivisibleByPrice - 구입 금액이 1000원 단위로 나누어 떨어지지 않으면 false를 반환한다. %s',
    (input) => {
      expect(isDivisibleByPrice(input)).toBeTruthy();
    },
  );
});

describe('checkRestartForm 기능 테스트', () => {
  test.each(['yes y', 'never'])(
    'isValidRestartInputForm - y 또는 n 이외의 다른 문자가 입력되면 false를 반환한다. %s',
    (input) => {
      expect(isValidRestartInputForm(input)).toBeFalsy();
    },
  );

  test.each(['y', 'n'])(
    'isValidRestartInputForm - y 또는 n 이외의 다른 문자가 입력되면 false를 반환한다. %s',
    (input) => {
      expect(isValidRestartInputForm(input)).toBeTruthy();
    },
  );
});
