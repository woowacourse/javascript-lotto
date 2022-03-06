import LottoSeller from '../LottoSeller';
import { getRateOfReturn } from '../utils';

const lottoSeller = new LottoSeller();

describe('유저가 구입한 로또 티켓의 번호가 일치한 만큼의 당첨금이 생성되는지 확인한다.', () => {
  const lastWeekWinningLottoList = [1, 2, 3, 4, 5, 6];
  const lastWeekWinningBounsNumber = 7;

  test('유저가 구입한 로또 티켓의 번호가 6개 일치한 경우 1등 당첨 금액이 생성되는지 확인한다.', () => {
    const userLottoList = [1, 2, 3, 4, 5, 6];

    expect(
      lottoSeller.confirmLottoList(
        userLottoList,
        lastWeekWinningLottoList,
        lastWeekWinningBounsNumber
      )
    ).toBe(2000000000);
  });

  test('유저가 구입한 로또 티켓의 번호가 5개 일치하고 보너스 볼이 맞은 경우 2등 당첨 금액이 생성되는지 확인한다.', () => {
    const userLottoList = [1, 2, 3, 4, 5, 7];

    expect(
      lottoSeller.confirmLottoList(
        userLottoList,
        lastWeekWinningLottoList,
        lastWeekWinningBounsNumber
      )
    ).toBe(30000000);
  });

  test('유저가 구입한 로또 티켓의 번호가 5개 일치한 경우 3등 당첨 금액이 생성되는지 확인한다.', () => {
    const userLottoList = [1, 2, 3, 4, 5, 8];

    expect(
      lottoSeller.confirmLottoList(
        userLottoList,
        lastWeekWinningLottoList,
        lastWeekWinningBounsNumber
      )
    ).toBe(1500000);
  });

  test('유저가 구입한 로또 티켓의 번호가 4개 일치한 경우 4등 당첨 금액이 생성되는지 확인한다.', () => {
    const userLottoList = [1, 2, 3, 4, 8, 9];

    expect(
      lottoSeller.confirmLottoList(
        userLottoList,
        lastWeekWinningLottoList,
        lastWeekWinningBounsNumber
      )
    ).toBe(50000);
  });

  test('유저가 구입한 로또 티켓의 번호가 3개 일치한 경우 5등 당첨 금액이 생성되는지 확인한다.', () => {
    const userLottoList = [1, 2, 3, 8, 9, 10];

    expect(
      lottoSeller.confirmLottoList(
        userLottoList,
        lastWeekWinningLottoList,
        lastWeekWinningBounsNumber
      )
    ).toBe(5000);
  });

  test('유저가 구입한 로또 티켓의 번호가 2개 이하로 일치한 경우 0원이 생성되는지 확인한다.', () => {
    const userLottoList = [10, 21, 31, 41, 15, 16];

    expect(
      lottoSeller.confirmLottoList(
        userLottoList,
        lastWeekWinningLottoList,
        lastWeekWinningBounsNumber
      )
    ).toBe(0);
  });
});

describe('유저가 구매한 로또 티켓들의 등수별 당첨 된 갯수를 확인한다.', () => {
  const lastWeekWinningLottoList = [1, 2, 3, 4, 5, 6];
  const lastWeekWinningBounsNumber = 7;
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
    lastWeekWinningLottoList,
    lastWeekWinningBounsNumber
  );

  test('유저가 구매한 로또 티켓의 1등 당첨 갯수를 확인한다.', () => {
    expect(lottoSeller.getWinningCount().firstWinner).toBe(1);
  });

  test('유저가 구매한 로또 티켓의 2등 당첨 갯수를 확인한다.', () => {
    expect(lottoSeller.getWinningCount().secondWinner).toBe(1);
  });

  test('유저가 구매한 로또 티켓의 3등 당첨 갯수를 확인한다.', () => {
    expect(lottoSeller.getWinningCount().thirdWinner).toBe(1);
  });

  test('유저가 구매한 로또 티켓의 4등 당첨 갯수를 확인한다.', () => {
    expect(lottoSeller.getWinningCount().forthWinner).toBe(1);
  });

  test('유저가 구매한 로또 티켓의 5등 당첨 갯수를 확인한다.', () => {
    expect(lottoSeller.getWinningCount().fifthWinner).toBe(1);
  });

  test('유저가 구매한 로또 티켓의 낙첨 갯수를 확인한다.', () => {
    expect(lottoSeller.getWinningCount().failed).toBe(1);
  });
});

describe('유저가 구입한 로또 티켓의 당첨금과 수익률을 확인한다.', () => {
  test('유저가 구입한 로또 티켓의 총 당첨금을 확인한다.', () => {
    const { FORTH_WINNER, FIFTH_WINNER, FAILED } =
      lottoSeller.getWinningAmount();
    const testWinningAmount = FORTH_WINNER + FIFTH_WINNER + FAILED;
    const lastWeekWinningLottoList = [1, 2, 3, 4, 5, 6];
    const lastWeekWinningBounsNumber = 7;
    const userAllLottoList = [
      [1, 2, 3, 4, 9, 10],
      [1, 2, 11, 4, 9, 10],
      [1, 2, 12, 13, 9, 10],
    ];

    lottoSeller.setWinningCount(
      userAllLottoList,
      lastWeekWinningLottoList,
      lastWeekWinningBounsNumber
    );

    expect(lottoSeller.totalWinningAmount()).toBe(testWinningAmount);
  });

  test('유저가 구입한 로또 티켓의 총 수익률을 확인한다.', () => {
    const purchasedAmount = 2000;
    const testRateOfReturn = 2650;
    const lastWeekWinningLottoList = [1, 2, 3, 4, 5, 6];
    const lastWeekWinningBounsNumber = 7;
    const userAllLottoList = [
      [1, 2, 3, 4, 9, 10],
      [1, 2, 11, 4, 9, 10],
    ];

    lottoSeller.setWinningCount(
      userAllLottoList,
      lastWeekWinningLottoList,
      lastWeekWinningBounsNumber
    );

    expect(
      getRateOfReturn(lottoSeller.totalWinningAmount(), purchasedAmount)
    ).toBe(testRateOfReturn);
  });
});
