import WebLottoManager from "../src/service/WebLottoManager";

describe("WebLottoManager 테스트", () => {
  const mockGenerator = () => [1, 2, 3, 4, 5, 6];

  describe("purchase(amount)", () => {
    test("8000원 입력 -> count 8, lottos 8개 반환", () => {
      const game = new WebLottoManager(mockGenerator);
      const { count, lottos } = game.purchase(8000);
      expect(count).toBe(8);
      expect(lottos).toHaveLength(8);
    });

    test("8000원 입력 -> lottos 번호 검증", () => {
      const game = new WebLottoManager(mockGenerator);
      const { lottos } = game.purchase(8000);
      expect(lottos[0].getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test("유효하지 않은 금액 -> 예외", () => {
      const game = new WebLottoManager(mockGenerator);
      expect(() => game.purchase(1500)).toThrow("[ERROR]");
    });
  });

  describe("getResult(winningNumbers, bonusNumber)", () => {
    test("purchase 없이 getResult 호출 -> 예외", () => {
      const game = new WebLottoManager(mockGenerator);
      expect(() => game.getResult([1, 2, 3, 4, 5, 6], 7)).toThrow("[ERROR]");
    });

    test("purchase 후 getResult -> prizeList, roi 반환", () => {
      const game = new WebLottoManager(mockGenerator);
      game.purchase(1000);
      const result = game.getResult([1, 2, 3, 4, 5, 6], 7);
      expect(result).toHaveProperty("prizeList");
      expect(result).toHaveProperty("roi");
    });

    test("1개 구매, 6개 일치 -> 1등 1개, roi 200000000", () => {
      const game = new WebLottoManager(() => [1, 2, 3, 4, 5, 6]);
      game.purchase(1000);
      const { prizeList, roi } = game.getResult([1, 2, 3, 4, 5, 6], 7);
      expect(prizeList[1]).toBe(1);
      expect(roi).toBe(200000000);
    });
  });

  describe("reset()", () => {
    test("purchase 후 reset -> getResult 호출 시 예외", () => {
      const game = new WebLottoManager(mockGenerator);
      game.purchase(1000);
      game.reset();
      expect(() => game.getResult([1, 2, 3, 4, 5, 6], 7)).toThrow("[ERROR]");
    });

    test("reset 후 purchase 재수행", () => {
      const game = new WebLottoManager(mockGenerator);
      game.purchase(1000);
      game.reset();
      expect(() => game.purchase(2000)).not.toThrow();
    });
  });
});
