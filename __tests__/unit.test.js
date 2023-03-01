import Random from "../src/utils/Random";
import Lotto from "../src/domain/Lotto";

describe("로또에 넣을 랜덤숫자 생성되는지 확인", () => {
  const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
  const randomNumbers = lotto
    .getLottoString()
    .split(", ")
    .map((v) => +v);

  test("로또에 넣을 랜덤숫자가 여섯 개면 통과", () => {
    expect(randomNumbers.length).toEqual(6);
  });

  test("로또에 넣을 랜덤숫자 내 중복이 없으면 통과", () => {
    const randomNumberSet = new Set(randomNumbers);
    expect(randomNumberSet.size).toEqual(6);
  });
});
