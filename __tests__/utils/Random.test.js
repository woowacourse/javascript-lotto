import Random from "../../src/utils/Random.js";

const mockMathRandom = (numbers) => {
  const spyMath = jest.spyOn(Math, "random");

  numbers.reduce((acc, number) => {
    acc.mockReturnValueOnce(number);
    return acc;
  }, spyMath);
};

describe("랜덤 숫자 뽑기 테스트", () => {
  test("시작 번호와 끝번호 사이에 숫자를 n가 만큼 뽑아서 배열로 반환하다", () => {
    mockMathRandom([
      (1 - 1) / 45,
      (2 - 1) / 45,
      (3 - 1) / 45,
      (4 - 1) / 45,
      (5 - 1) / 45,
      (6 - 1) / 45,
    ]);

    const start = 1,
      end = 45,
      count = 6;

    expect(Random.randomArray(start, end, count)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
