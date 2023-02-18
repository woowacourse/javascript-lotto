/* eslint-disable */

import LottoMachine from '../src/model/LottoMachine';

describe('LottoMahcine 테스트', () => {
  const lottoMachine = new LottoMachine();
  
  test('주어진 값에 따라 로또 생성', () => {
    lottoMachine.buyLotto(5000);

    expect(lottoMachine.lottos.length === 5).toBeTruthy();
  });

  test('당첨 금액 총합을 구하는 기능 테스트', () => {
    const ranks  = [5, 6, 6, 6, 5]; // 5등 2개
    
    const calculateTotalSum = lottoMachine.calculateTotalSum(ranks);

    expect(calculateTotalSum).toBe(10000);
  });

  test('수익률 구하는 기능 테스트', () => {
    const lotteryWinningsSum = 5000;
    const lottosCount = 8;

    const rateOfProfit = lottoMachine.rateOfProfit(lotteryWinningsSum, lottosCount);

    expect(rateOfProfit).toBe("62.5");
  })
});
