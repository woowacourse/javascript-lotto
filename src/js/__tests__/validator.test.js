import ValidatorImpl from '../ValidatorImpl/index.js';
import { LOTTO_RULES } from '../constant/index.js';

describe('요금을 1000원 이상 투입해야 한다.', () => {
  const { isLackFare } = new ValidatorImpl().checkFunctions;

  test('1000원 미만은 게임을 실행할 수 없다.', () => {
    const fare1 = 500;
    const fare2 = -500;
    const fare3 = 100.1;
    const fare4 = 999;

    expect(isLackFare(fare1)).toBe(true);
    expect(isLackFare(fare2)).toBe(true);
    expect(isLackFare(fare3)).toBe(true);
    expect(isLackFare(fare4)).toBe(true);
  });

  test('1000원 이상으로 게임 실행이 가능하다.', () => {
    const fare1 = 1000;
    const fare2 = 1000.01;

    expect(isLackFare(fare1)).toBe(false);
    expect(isLackFare(fare2)).toBe(false);
  });
});

describe('로또 당첨 번호가 유효해야 한다.', () => {
  const { isNotNumber, overlappedNumber, outedOfLottoNumberRange } = new ValidatorImpl()
    .checkFunctions;

  test('로또 당첨 번호가 값이 비어있으면 결과를 확인할 수 없다.', () => {
    const winningNumber = [45, '1', '', 3, 4, 5];

    expect(isEmpty(winningNumber)).toBe(false);
  });

  test('로또 당첨 번호가 숫자가 아니면 결과를 확인할 수 없다.', () => {
    const winningNumber = ['ab', '1', '2', 3, 4, 5];

    expect(isNotNumber(winningNumber)).toBe(true);
  });

  test('로또 당첨 번호가 숫자면 결과를 확인할 수 있다.', () => {
    const winningNumber = ['1', '2', 3, 4, 44, 45];

    expect(isNotNumber(winningNumber)).toBe(false);
  });

  test('로또 당첨 번호에 중복된 숫자가 있으면 결과를 확인할 수 없다.', () => {
    const winningNumber = [1, 2, 1, 2, 3, 4];

    expect(overlappedNumber(winningNumber)).toBe(true);
  });

  test(`로또 당첨 번호가 ${LOTTO_RULES.MIN_RANGE}이상이고 ${LOTTO_RULES.MAX_RANGE}이하라면 결과를 확인할 수 있다.`, () => {
    const winningNumber = [1, 2, 45, 43, 32, 21];

    expect(outedOfLottoNumberRange(winningNumber)).toBe(false);
  });

  test(`로또 당첨 번호가 ${LOTTO_RULES.MIN_RANGE}미만이면 결과를 확인할 수 없다.`, () => {
    const winningNumber = [-1, 0, -2, -3, -4, -5];

    expect(outedOfLottoNumberRange(winningNumber)).toBe(true);
  });

  test(`로또 당첨 번호가 ${LOTTO_RULES.MAX_RANGE}초과라면 결과를 확인할 수 없다.`, () => {
    const winningNumber = [46, 47, 48, 49, 50, 51];

    expect(outedOfLottoNumberRange(winningNumber)).toBe(true);
  });
});
