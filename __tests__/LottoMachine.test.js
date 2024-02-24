import LottoMachine from '../src/Domain/LottoMachine';

describe('로또 머신에 대한 테스트', () => {
  test.each([
    [7000, 7],
    [8500, 8],
  ])('구입금액에 해당하는 만큼 로또를 발행한다.', (money, count) => {
    // arrange
    const lottoMachine = new LottoMachine(money);
    // action
    const result = lottoMachine.getLottos();
    // assert
    expect(result.map((lotto) => lotto.constructor.name)).toStrictEqual(Array.from({ length: count }, () => 'Lotto'));
  });

  test.each([0, -1000, 999, NaN])('1000원 미만인 숫자와 잘못된 입력의 경우, (%i 인 경우) 에러를 던진다.', (money) => {
    expect(() => new LottoMachine(money)).toThrow();
  });
});
