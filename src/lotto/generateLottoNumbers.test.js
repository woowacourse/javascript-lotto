import generateLottoNumbers from "./generateLottoNumbers.js";
import { isInRange, isDuplicate, hasNotInteger } from "../utils/predicate.js";

describe("generateLottoNumbers 함수 테스트", () => {
  test("로또 번호의 개수가 6개이다.", () => {
    const lottoNumbers = generateLottoNumbers();
    expect(lottoNumbers.length).toBe(6);
  });

  test("로또 번호는 1부터 45까지의 숫자이다.", () => {
    const lottoNumbers = generateLottoNumbers();
    const isAllNumbersBetweenOneAndFortyFive = lottoNumbers.every((number) =>
      isInRange(number, 1, 45)
    );
    expect(isAllNumbersBetweenOneAndFortyFive).toBeTruthy();
  });

  test("로또 번호가 오름차순으로 정렬되어 있다.", () => {
    const lottoNumbers = generateLottoNumbers();
    const isSorted = lottoNumbers.every(
      (number, index, array) => index === 0 || number > array[index - 1]
    );
    expect(isSorted).toBeTruthy();
  });

  test("로또 번호가 중복되지 않는다.", () => {
    const lottoNumbers = generateLottoNumbers();
    expect(isDuplicate(lottoNumbers)).toBeFalsy();
  });

  test("로또 번호가 정수인지 체크한다.", () => {
    const lottoNumbers = generateLottoNumbers();
    expect(hasNotInteger(lottoNumbers)).toBeFalsy();
  });
});
