import generateRandomNumber from "../src/generateRandomNumber";

describe("로또를 뽑는 기능", () => {
  test("랜덤한 숫자가 1 이상 45 이하이다.", () => {
    const min = 1;
    const max = 45;

    const number = generateRandomNumber(min, max);

    expect(number).toBeGreaterThanOrEqual(min);
    expect(number).toBeLessThanOrEqual(max);
  });

  test("중복되지 않는 숫자 6개를 뽑는 기능 구현", () => {
    const lottoMachine = new LottoMachine();
    const lottoNumbers = lottoMachine.makeLottoNumbers();

    expect(new Set(lottoNumbers)).toHaveLength(6);
  });
});
