import generateRandomNumbers from "../../src/utils/generateRandomNumbers";

describe("domain/generateRandomNumbers", () => {
  test("랜덤 생성된 번호는 항상 6개여야 한다.", () => {
    const generatedLottoNumbers = generateRandomNumbers(1, 45, 6);

    expect(generatedLottoNumbers).toHaveLength(6);
  });

  test("생성된 숫자가 중복이 없어야 한다.", () => {
    const generatedLottoNumbers = generateRandomNumbers(1, 45, 6);
    const generateLottoNumbersSet = new Set(generatedLottoNumbers);
    expect(generateLottoNumbersSet.size).toBe(generatedLottoNumbers.length);
  });

  test("생성된 숫자가 오름차순으로 정렬되어야 한다.", () => {
    const generatedLottoNumbers = generateRandomNumbers(1, 45, 6);
    expect(generatedLottoNumbers).toEqual(
      [...generatedLottoNumbers].sort((a, b) => a - b)
    );
  });

  test.each([
    [generateRandomNumbers(1, 45, 6)],
    [generateRandomNumbers(1, 45, 6)],
    [generateRandomNumbers(1, 45, 6)],
  ])("랜덤 생성된 숫자가 1~45 범위를 벗어나지 않아야 한다. (%#)", (numbers) => {
    numbers.forEach((num) => {
      expect(num).toBeGreaterThanOrEqual(1);
      expect(num).toBeLessThanOrEqual(45);
    });
  });
});
