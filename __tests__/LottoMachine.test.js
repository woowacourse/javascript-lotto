/* eslint-disable */

import LottoMachine from '../src/model/LottoMachine';

describe('LottoMahcine 테스트', () => {
  let lottoMachine;

  beforeEach(() => {
    lottoMachine = new LottoMachine();
  });

  test('주어진 값에 따라 로또 생성', () => {
    lottoMachine.buyLotto(5000);

    expect(lottoMachine.lottos.length === 5).toBeTruthy();
  });

  test('단일 로또 정답 개수 테스트', () => {
    const winningNumber = [1, 2, 3, 4, 5, 6];
    const lottoNumber = [1, 2, 3, 4, 32, 45];

    const correctCounts = lottoMachine.computeCorrectCounts(winningNumber, lottoNumber);

    expect(correctCounts === 4).toBeTruthy();
  });

  test('단일 로또 당첨금액이 얼만지 확인하는 기능 테스트', () => {
    const lottoNumber = [1, 2, 3, 4, 5, 7];
    const targetNumber = { winningNumber: [1, 2, 3, 4, 5, 8], bonusNumber: 7 };

    const lotteryWinnings = lottoMachine.checkLotteryWinnings(lottoNumber, targetNumber);

    expect(lotteryWinnings).toBe(30000000);
  });

  describe('로또 총 수익률 계산 기능 테스트', () => {
    const lottos = [
      [1, 10, 20, 30, 40, 45], // 1등 2000000000
      [1, 10, 20, 30, 7, 45], // 2등 30000000
      [1, 10, 20, 30, 5, 6], // 4등 50000
      [2, 7, 10, 13, 23, 42], // 꽝
    ];

    const targetNumber = {
      winningNumber: [1, 10, 20, 30, 40, 45],
      bonusNumber: 7,
    };

    test('전체 로또 당청금 총합 확인하는 기능 테스트', () => {
      const lotteryWinningsSum = lottoMachine.lotteryWinningsSum(lottos, targetNumber);

      expect(lotteryWinningsSum).toBe(2030050000);
    });

    test('최종 수익률 계산하는 기능 테스트', () => {
      const lotteryWinningsSum = lottoMachine.lotteryWinningsSum(lottos, targetNumber);

      const rateOfProfit = lottoMachine.rateOfProfit(lotteryWinningsSum, lottos.length);

      // (2030050000 - 4000) / 4000
      expect(rateOfProfit).toBe(507511.5);
    });
  });
});
