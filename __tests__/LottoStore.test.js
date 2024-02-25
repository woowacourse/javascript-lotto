import LottoStore from "../src/step1/domains/LottoStore";

describe("로또 상점 도메인 테스트", () => {
  const INVALID_AMOUNT = ["", "harry", "100", 1200];

  test.each(INVALID_AMOUNT)(
    "로또 구입 금액이 1000의 배수가 아닌 경우 예외를 발생시킨다.(%s)",
    (amount) => {
      expect(() => {
        LottoStore.purchaseLottos(amount);
      }).toThrow("[ERROR]");
    }
  );

  test("로또 구입 금액을 입력하면 구입 금액에 해당하는 만큼 로또를 발행해야 한다.", () => {
    //given
    const AMOUNT = "10000";
    const EXPECTED_LENGTH = 10;

    //when
    const lottos = LottoStore.purchaseLottos(AMOUNT);

    //then
    expect(lottos.length).toBe(EXPECTED_LENGTH);
  });
});
