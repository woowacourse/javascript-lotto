const Random = require("../src/utils/Random");

describe("로또에 넣을 랜덤숫자 생성되는지 확인", () => {
  const randomNumbers = Random.generateRandomNumbers();
  test("로또에 넣을 랜덤숫자가 여섯 개면 통과", () => {
    const randomNumberLength = randomNumbers.length;
    expect(randomNumberLength).toEqual(6);
  });

  test("로또에 넣을 랜덤숫자 내 중복이 없으면 통과", () => {
    const randomNumberSet = new Set(randomNumbers);
    expect(randomNumberSet.size).toEqual(6);
  });
});
