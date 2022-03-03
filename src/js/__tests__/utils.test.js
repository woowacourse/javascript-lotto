import {
  isNegativeInteger,
  isEqualToZero,
  isString,
  hasRemainder,
  getRateOfReturn,
  createRandomNumberList,
  shuffleArray,
  isDuplicateNumbers,
  isOutOfRange,
} from '../utils';

import { LOTTO, MONEY } from '../constants';

import LottoConsumer from '../LottoConsumer';
import LottoSeller from '../LottoSeller';

const lottoConsumer = new LottoConsumer();
const lottoSeller = new LottoSeller();

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

describe('구입할 금액이 문자열인지 확인한다.', () => {
  test('구입할 금액이 문자열인 경우', () => {
    const payment = 'asd';

    expect(isString(payment)).toBe(true);
  });

  test('구입할 금액이 문자열이 아닌 경우', () => {
    const payment = 3000;

    expect(isString(payment)).toBe(false);
  });
});

describe('구입할 금액이 0인지 확인한다.', () => {
  test('구입할 금액이 0인 경우.', () => {
    const payment = 0;

    expect(isEqualToZero(payment)).toBe(true);
  });
  test('구입할 금액이 0이 아닌 경우.', () => {
    const payment = 3000;

    expect(isEqualToZero(payment)).toBe(false);
  });
});

describe('구입할 금액이 음의 정수인지 확인한다', () => {
  test('구입할 금액이 음의 정수인 경우. 입력: -1', () => {
    const payment = -1;

    expect(isNegativeInteger(payment)).toBe(true);
  });

  test('구입할 금액이 음의 정수가 아닌 경우. 입력: 3000', () => {
    const payment = 3000;

    expect(isNegativeInteger(payment)).toBe(false);
  });
});

describe(`구입할 금액이 ${MONEY.STANDARD}으로 나누어 떨어지는지 확인한다.`, () => {
  test(`구입할 금액이 ${MONEY.STANDARD}으로 나누어 떨어지지 않는 경우.`, () => {
    const payment = 33;

    expect(hasRemainder(payment, MONEY.STANDARD)).toBe(true);
  });

  test(`구입 금액이 ${MONEY.STANDARD}으로 나누어 떨어지는 경우.`, () => {
    const payment = 3000;

    expect(hasRemainder(payment, MONEY.STANDARD)).toBe(false);
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
    const lottoList = lottoConsumer.createLottoList();

    expect(lottoList.length).toBe(new Set(lottoList).size);
  });
});

describe('유저가 구입한 로또 티켓의 번호가 일치한 만큼의 당첨금이 생성되는지 확인한다.', () => {
  const lastWeekLottoList = [1, 2, 3, 4, 5, 6];
  const lastWeekBounsNumber = 7;

  test('유저가 구입한 로또 티켓의 번호가 6개 일치한 경우 1등 당첨 금액이 생성되는지 확인한다.', () => {
    const userLottoList = [1, 2, 3, 4, 5, 6];

    expect(
      lottoSeller.confirmLottoList(
        userLottoList,
        lastWeekLottoList,
        lastWeekBounsNumber
      )
    ).toBe(2000000000);
  });

  test('유저가 구입한 로또 티켓의 번호가 5개 일치하고 보너스 볼이 맞은 경우 2등 당첨 금액이 생성되는지 확인한다.', () => {
    const userLottoList = [1, 2, 3, 4, 5, 7];

    expect(
      lottoSeller.confirmLottoList(
        userLottoList,
        lastWeekLottoList,
        lastWeekBounsNumber
      )
    ).toBe(30000000);
  });

  test('유저가 구입한 로또 티켓의 번호가 5개 일치한 경우 3등 당첨 금액이 생성되는지 확인한다.', () => {
    const userLottoList = [1, 2, 3, 4, 5, 8];

    expect(
      lottoSeller.confirmLottoList(
        userLottoList,
        lastWeekLottoList,
        lastWeekBounsNumber
      )
    ).toBe(1500000);
  });

  test('유저가 구입한 로또 티켓의 번호가 4개 일치한 경우 4등 당첨 금액이 생성되는지 확인한다.', () => {
    const userLottoList = [1, 2, 3, 4, 8, 9];

    expect(
      lottoSeller.confirmLottoList(
        userLottoList,
        lastWeekLottoList,
        lastWeekBounsNumber
      )
    ).toBe(50000);
  });

  test('유저가 구입한 로또 티켓의 번호가 3개 일치한 경우 5등 당첨 금액이 생성되는지 확인한다.', () => {
    const userLottoList = [1, 2, 3, 8, 9, 10];

    expect(
      lottoSeller.confirmLottoList(
        userLottoList,
        lastWeekLottoList,
        lastWeekBounsNumber
      )
    ).toBe(5000);
  });

  test('유저가 구입한 로또 티켓의 번호가 2개 이하로 일치한 경우 0원이 생성되는지 확인한다.', () => {
    const userLottoList = [10, 21, 31, 41, 15, 16];

    expect(
      lottoSeller.confirmLottoList(
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

  lottoSeller.setWinningCount(
    userAllLottoList,
    lastWeekLottoList,
    lastWeekBounsNumber
  );

  test('1등 당첨 갯수 확인', () => {
    expect(lottoSeller.getWinningCount().firstWinner).toBe(1);
  });

  test('2등 당첨 갯수 확인', () => {
    expect(lottoSeller.getWinningCount().secondWinner).toBe(1);
  });

  test('3등 당첨 갯수 확인', () => {
    expect(lottoSeller.getWinningCount().thirdWinner).toBe(1);
  });

  test('4등 당첨 갯수 확인', () => {
    expect(lottoSeller.getWinningCount().forthWinner).toBe(1);
  });

  test('5등 당첨 갯수 확인', () => {
    expect(lottoSeller.getWinningCount().fifthWinner).toBe(1);
  });

  test('낙첨 갯수 확인', () => {
    expect(lottoSeller.getWinningCount().failed).toBe(1);
  });
});

test('유저가 구입한 로또 티켓의 총 당첨금을 확인한다.', () => {
  const { forthWinner, fifthWinner, failed } = lottoSeller.getWinningAmount();
  const testWinningAmount = forthWinner + fifthWinner + failed;
  const lastWeekLottoList = [1, 2, 3, 4, 5, 6];
  const lastWeekBounsNumber = 7;
  const userAllLottoList = [
    [1, 2, 3, 4, 9, 10],
    [1, 2, 11, 4, 9, 10],
    [1, 2, 12, 13, 9, 10],
  ];

  lottoSeller.setWinningCount(
    userAllLottoList,
    lastWeekLottoList,
    lastWeekBounsNumber
  );

  expect(lottoSeller.totalWinningAmount()).toBe(testWinningAmount);
});
``;

test('유저가 구입한 로또 티켓의 총 수익률을 확인한다.', () => {
  const purchasedAmount = 2000;
  const testRateOfReturn = 2650;
  const lastWeekLottoList = [1, 2, 3, 4, 5, 6];
  const lastWeekBounsNumber = 7;
  const userAllLottoList = [
    [1, 2, 3, 4, 9, 10],
    [1, 2, 11, 4, 9, 10],
  ];

  lottoSeller.setWinningCount(
    userAllLottoList,
    lastWeekLottoList,
    lastWeekBounsNumber
  );

  expect(
    getRateOfReturn(lottoSeller.totalWinningAmount(), purchasedAmount)
  ).toBe(testRateOfReturn);
});

describe('당첨 번호, 보너스 번호가 중복된 숫자가 있는지 확인한다. (실패/성공 케이스)', () => {
  test('당첨 번호, 보너스 번호 중에 중복된 숫자가 있을 경우. 입력: [1, 2, 2, 3, 4, 5], 6 / 실패 케이스', () => {
    const winningNumberList = [1, 2, 2, 3, 4, 5];
    const bounsNumber = 7;

    expect(isDuplicateNumbers(winningNumberList, bounsNumber)).toBe(true);
  });

  test('당첨 번호, 보너스 번호 중에 중복된 숫자가 없을 경우. 입력: [1, 2, 3, 4, 5, 6], 6 / 성공 케이스', () => {
    const winningNumberList = [1, 2, 3, 4, 5, 6];
    const bounsNumber = 7;

    expect(isDuplicateNumbers(winningNumberList, bounsNumber)).toBe(false);
  });
});

describe('당첨 번호, 보너스 번호 중에 1 ~ 45 사이의 숫자가 아닌 값이 있는지 확인한다. (실패/성공 케이스)', () => {
  test('당첨 번호, 보너스 번호 중에 1 ~ 45 사이의 숫자가 아닌 경우', () => {
    const winningNumberList = [46, 2, 3, 4, 5, 6];
    const bounsNumber = 7;

    expect(isOutOfRange(winningNumberList, bounsNumber)).toBe(true);
  });

  test('당첨 번호, 보너스 번호 모두 1 ~ 45 사이의 숫자인 경우', () => {
    const winningNumberList = [1, 2, 3, 4, 5, 6];
    const bounsNumber = 7;

    expect(isOutOfRange(winningNumberList, bounsNumber)).toBe(false);
  });
});
