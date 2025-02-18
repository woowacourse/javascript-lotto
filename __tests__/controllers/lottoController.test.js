import lottoController, {
  generateLottoNumbers,
} from "../../src/controllers/LottoController.js";
import Lotto from "../../src/models/Lotto.js";

jest.mock("../../src/models/Lotto.js");

describe("controllers/lottoController", () => {
  describe("generateLottoNumbers()", () => {
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

  describe("lottoController()", () => {
    test("입력받은 금액만큼 로또 수를 발행한다.", () => {
      const price = 8000;
      lottoController(price);

      expect(Lotto).toHaveBeenCalledTimes(8);
    });
  });
});
