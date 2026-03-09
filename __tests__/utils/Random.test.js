import Random from "../../src/utils/Random.js";

const mockRandoms = (numbers) => {
  Random.randomArray = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, Random.randomArray);
};

describe("랜덤 숫자 뽑기 테스트", () => {
  test("시작 번호와 끝번호 사이에 숫자를 n가 만큼 뽑아서 배열로 반환하다", () => {
    mockRandoms([
      [1, 2, 3, 4, 5, 6], //
    ]);

    const start = 1,
      end = 45,
      count = 6;

    expect(Random.randomArray(start, end, count)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
