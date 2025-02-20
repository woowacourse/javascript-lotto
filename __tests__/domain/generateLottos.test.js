import {
  generateLottos,
  generateLottoNumbers,
} from "../../src/domain/generateLottos.js";

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

      for (let i = 0; i < numbers.length - 1; i++) {
        expect(numbers[i] < numbers[i + 1]).toBe(true);
      }
    });
  });

  describe("generateLottos()", () => {
    test("받은 금액에 맞는 수량의 로또를 발행해야 한다.", () => {
      const price = 8000;

      const lottos = generateLottos(price);

      expect(lottos.length).toBe(8);
    });
  });
});
