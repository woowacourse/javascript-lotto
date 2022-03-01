import {
  isPositiveInteger,
  isDivisibleBy,
  getRateOfReturn,
  createRandomNumberList,
  shuffleArray,
  isUniqueNumbers,
} from '../utils';

import { LOTTO, MONEY } from '../constants';

import Lotto from '../Lotto';

const lotto = new Lotto();

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

describe('구입할 금액이 양의 정수인지 확인한다(실패/성공 케이스)', () => {
  test('구입할 금액이 양의 정수가 아닐 경우 에러메시지를 보여준다. 입력: -1, 실패 케이스', () => {
    const payment = -1;

    expect(() => {
      isPositiveInteger(payment);
    }).toThrowError();
  });

  test('구입할 금액이 양의 정수가 아닐 경우 에러메시지를 보여준다. 입력: " ", 실패 케이스', () => {
    const payment = ' ';

    expect(() => {
      isPositiveInteger(payment);
    }).toThrowError();
  });

  test('구입할 금액이 양의 정수일 경우 입력한 금액을 반환한다. 입력: 3, 성공 케이스', () => {
    const payment = 3;

    expect(isPositiveInteger(payment)).toBe(3);
  });
});

describe(`구입할 금액이 ${MONEY.STANDARD}으로 나누어 떨어지는지 확인한다 (실패/성공 케이스)`, () => {
  test(`구입할 금액이 ${MONEY.STANDARD}으로 나누어 떨어지 않은 경우 에러메시지를 보여준다. 입력: 33, 실패 케이스`, () => {
    const payment = 33;

    expect(() => {
      isDivisibleBy(payment, MONEY.STANDARD);
    }).toThrowError();
  });

  test(`구입 금액이 ${MONEY.STANDARD}으로 나누어 떨어질 경우 (구입 금액/${MONEY.STANDARD})을 반환한다. 입력: 3000, 성공 케이스`, () => {
    const payment = 3000;

    expect(isDivisibleBy(payment, MONEY.STANDARD)).toBe(3);
  });
});

describe('구입한 로또 번호가 올바르게 생성되는지 확인한다', () => {
  test(`${LOTTO.MIN_NUMBER}에서 ${LOTTO.MAX_NUMBER}까지의 숫자가 섞여있는 랜덤 리스트가 올바르게 생성되는지 확인한다.`, () => {
    const shuffleRandomList = shuffleArray(createRandomNumberList());

    shuffleRandomList.forEach((randomNumber) => {
      expect(randomNumber).toBeWithinRange(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER);
    });
  });

  test('구입한 로또 번호는 서로 다른 랜덤한 숫자 6개로 이루어진 값이다, 성공 케이스', () => {
    const lottoList = lotto.createLottoList();

    expect(lottoList.length).toBe(new Set(lottoList).size);
  });
});

describe('유저가 구입한 로또 티켓의 번호가 일치한 만큼의 당첨금이 생성되는지 확인한다.', () => {
  const lastWeekLottoList = [1, 2, 3, 4, 5, 6];
  const lastWeekBounsNumber = 7;

  test('유저가 구입한 로또 티켓의 번호가 6개 일치한 경우 1등 당첨 금액이 생성되는지 확인한다.', () => {
    const userLottoList = [1, 2, 3, 4, 5, 6];

    expect(
      lotto.confirmLottoList(
        userLottoList,
        lastWeekLottoList,
        lastWeekBounsNumber
      )
    ).toBe(2000000000);
  });

  test('유저가 구입한 로또 티켓의 번호가 5개 일치하고 보너스 볼이 맞은 경우 2등 당첨 금액이 생성되는지 확인한다.', () => {
    const userLottoList = [1, 2, 3, 4, 5, 7];

    expect(
      lotto.confirmLottoList(
        userLottoList,
        lastWeekLottoList,
        lastWeekBounsNumber
      )
    ).toBe(30000000);
  });

  test('유저가 구입한 로또 티켓의 번호가 5개 일치한 경우 3등 당첨 금액이 생성되는지 확인한다.', () => {
    const userLottoList = [1, 2, 3, 4, 5, 8];

    expect(
      lotto.confirmLottoList(
        userLottoList,
        lastWeekLottoList,
        lastWeekBounsNumber
      )
    ).toBe(1500000);
  });

  test('유저가 구입한 로또 티켓의 번호가 4개 일치한 경우 4등 당첨 금액이 생성되는지 확인한다.', () => {
    const userLottoList = [1, 2, 3, 4, 8, 9];

    expect(
      lotto.confirmLottoList(
        userLottoList,
        lastWeekLottoList,
        lastWeekBounsNumber
      )
    ).toBe(50000);
  });

  test('유저가 구입한 로또 티켓의 번호가 3개 일치한 경우 5등 당첨 금액이 생성되는지 확인한다.', () => {
    const userLottoList = [1, 2, 3, 8, 9, 10];

    expect(
      lotto.confirmLottoList(
        userLottoList,
        lastWeekLottoList,
        lastWeekBounsNumber
      )
    ).toBe(5000);
  });

  test('유저가 구입한 로또 티켓의 번호가 2개 이하로 일치한 경우 0원이 생성되는지 확인한다.', () => {
    const userLottoList = [10, 21, 31, 41, 15, 16];

    expect(
      lotto.confirmLottoList(
        userLottoList,
        lastWeekLottoList,
        lastWeekBounsNumber
      )
    ).toBe(0);
  });
});

describe('유저가 구매한 로또 티켓들의 등수별 당첨 된 갯수 확인', () => {
  const lastWeekLottoList = [1, 2, 3, 4, 5, 6];
  const lastWeekBounsNumber = 7;
  const userAllLottoList = [
    [1, 2, 3, 4, 5, 6],
    [2, 3, 4, 5, 6, 7],
    [1, 2, 3, 4, 5, 10],
    [1, 2, 3, 4, 9, 10],
    [1, 2, 11, 4, 9, 10],
    [1, 2, 12, 13, 9, 10],
  ];

  lotto.setLottoCount(userAllLottoList, lastWeekLottoList, lastWeekBounsNumber);

  test('1등 당첨 갯수 확인', () => {
    expect(lotto.getWinningCount().firstWinner).toBe(1);
  });

  test('2등 당첨 갯수 확인', () => {
    expect(lotto.getWinningCount().secondWinner).toBe(1);
  });

  test('3등 당첨 갯수 확인', () => {
    expect(lotto.getWinningCount().thirdWinner).toBe(1);
  });

  test('4등 당첨 갯수 확인', () => {
    expect(lotto.getWinningCount().forthWinner).toBe(1);
  });

  test('5등 당첨 갯수 확인', () => {
    expect(lotto.getWinningCount().fifthWinner).toBe(1);
  });

  test('낙첨 갯수 확인', () => {
    expect(lotto.getWinningCount().failed).toBe(1);
  });
});

test('유저가 구입한 로또 티켓의 총 당첨금을 확인한다.', () => {
  const { forthWinner, fifthWinner, failed } = lotto.getWinningAmount();
  const testWinningAmount = forthWinner + fifthWinner + failed;
  const lastWeekLottoList = [1, 2, 3, 4, 5, 6];
  const lastWeekBounsNumber = 7;
  const userAllLottoList = [
    [1, 2, 3, 4, 9, 10],
    [1, 2, 11, 4, 9, 10],
    [1, 2, 12, 13, 9, 10],
  ];

  lotto.setLottoCount(userAllLottoList, lastWeekLottoList, lastWeekBounsNumber);

  expect(lotto.totalWinningAmount()).toBe(testWinningAmount);
});

test('유저가 구입한 로또 티켓의 총 수익률을 확인한다.', () => {
  const purchasedAmount = 2000;
  const testRateOfReturn = 27.5;
  const lastWeekLottoList = [1, 2, 3, 4, 5, 6];
  const lastWeekBounsNumber = 7;
  const userAllLottoList = [
    [1, 2, 3, 4, 9, 10],
    [1, 2, 11, 4, 9, 10],
  ];

  lotto.setLottoCount(userAllLottoList, lastWeekLottoList, lastWeekBounsNumber);

  expect(getRateOfReturn(lotto.totalWinningAmount(), purchasedAmount)).toBe(
    testRateOfReturn
  );
});

describe('당첨 번호, 보너스 번호가 중복된 숫자가 있는지 확인한다. (실패/성공 케이스)', () => {
  test('당첨 번호, 보너스 번호 중에 중복된 숫자가 있을 경우 . 입력: [1, 2, 2, 3, 4, 5], 6 / 실패 케이스', () => {
    const winningNumberList = [1, 2, 2, 3, 4, 5];
    const bounsNumber = 7;

    expect(!isUniqueNumbers(winningNumberList, bounsNumber)).toBe(false);
  });

  test('당첨 번호, 보너스 번호 중에 중복된 숫자가 없을 경우 에러메시지를 띄워준다. 입력: [1, 2, 3, 4, 5, 6], 6 / 성공 케이스', () => {
    const winningNumberList = [1, 2, 3, 4, 5, 6];
    const bounsNumber = 7;

    expect(!isUniqueNumbers(winningNumberList, bounsNumber)).toBe(true);
  });
});

// 중복값 체크
