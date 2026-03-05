import Lotto from "../../src/domain/Lotto.js";

describe("Lotto 테스트", () => {
  describe("생성자 테스트", () => {
    // 로또 번호 개수 예외 테스트
    test(`로또의 번호가 ${Lotto.SIZE}개인지 테스트`, () => {
      const overSize = Array.from(
        { length: Lotto.SIZE + 1 },
        (_, i) => Lotto.MIN_RANGE + i,
      );
      expect(() => new Lotto(overSize)).toThrow("[ERROR]");
    });

    // 경계에 있는 값 +/-1로 엣지 케이스를 테스트 해서 예외 테스트
    test("로또 번호가 허용 범위 내에 있는지 테스트 (최소 미만)", () => {
      expect(
        () =>
          new Lotto([
            Lotto.MIN_RANGE - 1,
            Lotto.MIN_RANGE,
            Lotto.MIN_RANGE + 1,
            Lotto.MIN_RANGE + 2,
            Lotto.MIN_RANGE + 3,
            Lotto.MIN_RANGE + 4,
          ]),
      ).toThrow("[ERROR]");
    });

    test("로또 번호가 허용 범위 내에 있는지 테스트 (최대 초과)", () => {
      expect(
        () =>
          new Lotto([
            Lotto.MAX_RANGE - 4,
            Lotto.MAX_RANGE - 3,
            Lotto.MAX_RANGE - 2,
            Lotto.MAX_RANGE - 1,
            Lotto.MAX_RANGE,
            Lotto.MAX_RANGE + 1,
          ]),
      ).toThrow("[ERROR]");
    });

    // 로또번호 중복 예외 테스트
    test("로또번호가 중복이 되고 있는지 테스트", () => {
      expect(
        () =>
          new Lotto([
            Lotto.MIN_RANGE,
            Lotto.MIN_RANGE,
            Lotto.MIN_RANGE + 1,
            Lotto.MIN_RANGE + 2,
            Lotto.MIN_RANGE + 3,
            Lotto.MIN_RANGE + 4,
          ]),
      ).toThrow("[ERROR]");
    });

    // 정상 생성 테스트
    test("에러없이 로또가 정상적으로 생성된다.", () => {
      expect(() =>
        new Lotto([
          Lotto.MIN_RANGE,
          Lotto.MIN_RANGE + 1,
          Lotto.MIN_RANGE + 2,
          Lotto.MIN_RANGE + 3,
          Lotto.MIN_RANGE + 4,
          Lotto.MAX_RANGE,
        ]).not.toThrow(),
      );
    });
  });
});
