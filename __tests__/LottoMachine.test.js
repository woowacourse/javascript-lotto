import LottoMachine from '../src/domain/LottoMachine';

describe('LottoMachine 클래스입니다.', () => {
  const lottoMachine = new LottoMachine(1000);
  test.each([
    [1000, 1],
    [2000, 2],
    [3000, 3],
  ])('금액을 받으면 구매해야 할 올바른 수량 반환한다.', (money, expected) => {
    expect(lottoMachine.calcLottoAmount(money)).toEqual(expected);
  });
  test.each([1001, 10015, 34678])('잘못된 금액을 받으면 에러를 반환한다.', (money) => {
    expect(() => lottoMachine.calcLottoAmount(money)).toThrow();
  });
});
