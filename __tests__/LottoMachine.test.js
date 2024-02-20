import LottoMachine from "../src/Domain/LottoMachine";

describe("로또 머신에 대한 테스트", () => {
  test.each([
    [7000, 7],
    [8500, 8],
  ])("구입금액에 해당하는 만큼 로또를 발행한다.", (money, count) => {
    // arrange
    const lottoMachine = new LottoMachine();
    // action
    const result = lottoMachine.makeLottoByMoney(money);
    // assert
    expect(result.map((lotto) => lotto.constructor.name)).toStrictEqual(
      Array.from({ length: count }, () => "Lotto")
    );
  });
});
