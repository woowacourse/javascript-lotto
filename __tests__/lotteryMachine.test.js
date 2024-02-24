import LotteryMachine from '../src/domain/services/LotteryMachine';

describe('로또 발행 테스트', () => {
  test('1000원 단위로 입력한 구입 금액에 해당하는 만큼 로또를 발행한다.', () => {
    const PURCHASE_AMOUNT = 2000;
    const LOTTERY_AMOUNT = 2;

    const lotteryMachine = new LotteryMachine(PURCHASE_AMOUNT);
    const lottoNumberList = lotteryMachine.makeLottery();

    expect(lottoNumberList.length).toEqual(LOTTERY_AMOUNT);
  });
});
