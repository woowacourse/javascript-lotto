import generateLottoNumbers from "../src/util/generateLottoNumbers.js";

test("랜덤값 6개로 구성된 배열을 반환하는지?", () => {
  const lottoNumers = generateLottoNumbers();

  expect(lottoNumers.length).toBe(6);
});

test("랜덤값 배열에 중복된 값이 없는가?", () => {
  const lottoNumers = generateLottoNumbers();
  const setNumbers = new Set(lottoNumers);

  expect(setNumbers.size).toBe(6);
});

test("로또 숫자가 모두 1~45인지", () => {
  const lottoNumers = generateLottoNumbers();
  const isRange = lottoNumers.every((number) => number >= 1 && number <= 45);

  expect(isRange).toBe(true);
});
