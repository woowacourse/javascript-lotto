import LottoStore from "../src/LottoStore.js";
import Lotto from "../src/Lotto.js";

describe("LottoStore 클래스 유닛 테스트", () => {
  describe("purchaseLotto", () => {
    test("구입 금액이 1000원 단위이면 로또 인스턴스를 반환한다.", () => {
      // given
      const amount = 1000;

      // when
      const lottos = LottoStore.purchaseLottos(amount);

      // then
      lottos.forEach((lotto) => {
        expect(lotto).toBeInstanceOf(Lotto);
      });
    });
    test("구입 금액이 1000원 단위가 아니면 예외를 반환한다.", () => {
      // given
      const amount = 1500;

      // when & then
      expect(() => LottoStore.purchaseLottos(amount)).toThrow();
    });

    test("구입 금액이 음수이면 예외를 반환한다.", () => {
      // given
      const amount = -1000;

      // when & then
      expect(() => LottoStore.purchaseLottos(amount)).toThrow();
    });
  });

  describe("createRandomLotto", () => {
    test("랜덤한 로또 번호를 가지는 로또 인스턴스를 반환한다.", () => {
      // when
      const lotto = LottoStore.createRandomLotto();

      // then
      expect(lotto).toBeInstanceOf(Lotto);
    });
  });
});
