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
});
