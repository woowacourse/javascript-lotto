import ArrayHandler from "../../src/util/ArrayHandler.js";

describe("ArrayHandler테스트", () => {
  const ascendingOrderSortedNumbers = [1, 2, 3, 4, 5];
  test.each([
    [
      [5, 4, 3, 2, 1],
      [5, 4, 3, 1, 2],
      [1, 2, 3, 4, 5],
    ],
  ])("배열 오름차순 정렬 테스트", (numbers) => {
    expect(ArrayHandler.sortAscendingOrder(numbers)).toEqual(
      ascendingOrderSortedNumbers
    );
  });
});
