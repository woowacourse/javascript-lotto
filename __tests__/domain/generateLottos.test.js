import {
  generateLottos,
  generateLottoNumbers,
} from "../../src/domain/generateLottos.js";
import Lotto from "../../src/models/Lotto.js";

describe("domain/generateLottos", () => {
  describe("generatedLottoNumbers()", () => {
    test("생성된 로또 번호는 6개여야 한다.", () => {
      const lottoNumbers = generateLottoNumbers();
      expect(lottoNumbers).toHaveLength(6);
    });

    test("생성된 숫자가 중복이 없어야 한다.", () => {
      const generatedLottoNumbers = generateLottoNumbers();
      const generateLottoNumbersSet = new Set(generatedLottoNumbers);
      expect(generateLottoNumbersSet.size).toBe(generatedLottoNumbers.length);
    });

    test("생성된 숫자가 오름차순으로 정렬되어야 한다.", () => {
      const numbers = generateLottoNumbers();
      expect(numbers).toEqual([...numbers].sort((a, b) => a - b));
    });

    test.each([
      [generateLottoNumbers()],
      [generateLottoNumbers()],
      [generateLottoNumbers()],
    ])("랜덤 생성된 로또 번호는 항상 6개여야 한다. (%#)", (lottoNumbers) => {
      expect(lottoNumbers).toHaveLength(6);
    });

    test.each([
      [generateLottoNumbers()],
      [generateLottoNumbers()],
      [generateLottoNumbers()],
    ])(
      "랜덤 생성된 숫자가 1~45 범위를 벗어나지 않아야 한다. (%#)",
      (numbers) => {
        numbers.forEach((num) => {
          expect(num).toBeGreaterThanOrEqual(1);
          expect(num).toBeLessThanOrEqual(45);
        });
      },
    );
  });

  describe("generateLottos()", () => {
    test.each([
      [1000, 1],
      [5000, 5],
      [10000, 10],
      [15000, 15],
      [20000, 20],
    ])(
      "받은 금액(%d원)에 맞는 수량(%d개)의 로또를 발행해야 한다. (%#)",
      (price, expectedCount) => {
        const lottos = generateLottos(price);
        expect(lottos.length).toBe(expectedCount);
        expect(lottos.every((lotto) => lotto instanceof Lotto)).toBe(true);
      },
    );
  });
});
