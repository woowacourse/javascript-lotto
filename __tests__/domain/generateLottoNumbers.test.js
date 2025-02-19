import { generateLottoNumbers } from "../../src/domain/generateLottoNumbers.js";

describe("domain/generateLottoNumbers", () => {
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
