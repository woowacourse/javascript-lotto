import {
  isPositiveInteger,
  isRemainder,
  createRandomNumberList,
  isOverRange,
  winningCount,
  isBounusNumber,
  isOverlapped,
} from '../util/utils';

import { MONEY, LOTTO } from '../util/constants';

describe('구입할 금액이 양의 정수인지 확인한다(실패/성공 케이스)', () => {
  test('구입할 금액이 양의 정수인지 확인한다. 입력: -1, 실패 케이스', () => {
    const payment = -1;

    expect(isPositiveInteger(payment)).toBe(false);
  });

  test('구입할 금액이 양의 정수인지 확인한다. 입력: " ", 실패 케이스', () => {
    const payment = ' ';

    expect(isPositiveInteger(payment)).toBe(false);
  });

  test('구입할 금액이 양의 정수인지 확인하다. 입력: 3, 성공 케이스', () => {
    const payment = 3;

    expect(isPositiveInteger(payment)).toBe(true);
  });
});

describe(`구입할 금액이 ${MONEY.STANDARD}으로 나누어 떨어지는지 확인한다 (실패/성공 케이스)`, () => {
  test(`구입할 금액이 ${MONEY.STANDARD}으로 나누어 떨어지 않은 경우 에러메시지를 보여준다. 입력: 33, 성공 케이스`, () => {
    const payment = 133;

    expect(isRemainder(payment, MONEY.STANDARD)).toBe(true);
  });

  test(`구입 금액이 ${MONEY.STANDARD}으로 나누어 떨어질 경우 (구입 금액/${MONEY.STANDARD})을 반환한다. 입력: 3000, 실패 케이스`, () => {
    const payment = 3000;

    expect(isRemainder(payment, MONEY.STANDARD)).toBe(false);
  });
});

describe('구입한 로또 번호가 올바르게 생성되는지 확인한다', () => {
  test('구입한 로또 번호는 서로 다른 랜덤한 숫자 6개로 이루어진 값이다, 성공 케이스', () => {
    const randomNumberList = createRandomNumberList();

    expect(randomNumberList.length).toBe(new Set(randomNumberList).size);
  });
});

describe('입력된 지난주 당첨 번호와 보너스 번호가 올바른지 확인한다', () => {
  test(`지난주 당첨 번호와 보너스 번호는 ${LOTTO.MIN_NUMBER} ~ ${LOTTO.MAX_NUMBER} 사이의 정수이다. 입력: 0, 성공 케이스`, () => {
    const lastWeekNumber = 0;

    expect(isOverRange(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER, lastWeekNumber)).toBe(true);
  });

  test(`지난주 당첨 번호와 보너스 번호는 ${LOTTO.MIN_NUMBER} ~ ${LOTTO.MAX_NUMBER} 사이의 정수이다. 입력: 45, 실패 케이스`, () => {
    const lastWeekNumber = 45;

    expect(isOverRange(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER, lastWeekNumber)).toBe(false);
  });

  test('지난주 당첨 번호와 보너스 번호는 서로 다른 숫자이다. 입력: [1, 2, 3, 4, 5, 6, 6] 실패 케이스', () => {
    const lastWeekNumber = [1, 2, 3, 4, 5, 6, 6];

    expect(isOverlapped(lastWeekNumber)).toBe(true);
  });

  test('지난주 당첨 번호와 보너스 번호는 서로 다른 숫자이다. 입력: [1, 2, 3, 4, 5, 6, 7] 성공 케이스', () => {
    const lastWeekNumber = [1, 2, 3, 4, 5, 6, 7];

    expect(isOverlapped(lastWeekNumber)).toBe(false);
  });
});

describe('지난주 당첨 번호, 보너스 번호와 로또가 몇개 일치하는지 확인한다', () => {
  test('지난주 당첨 번호와 로또가 몇개 일치하는지 확인한다. 성공 케이스', () => {
    const lotto = [1, 2, 3, 4, 5, 6];
    const winningLotto = [24, 1, 7, 3, 45, 4];

    expect(winningCount(lotto, winningLotto)).toBe(3);
  });

  test('로또 번호 중 보너스 번호와 일치하는 값이 있는지 확인한다. 성공 케이스', () => {
    const lotto = [1, 2, 3, 4, 5, 6];
    const bounusNumber = 2;

    expect(isBounusNumber(lotto, bounusNumber)).toBe(true);
  });
});
