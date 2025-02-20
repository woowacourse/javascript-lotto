import Lotto from "../src/domain/Lotto.js";

test("로또 번호를 오름차순으로 정렬한다.", () => {
  const numbers = [9, 8, 7, 6, 5, 4];
  const lotto = new Lotto(numbers);

  expect(lotto.numbers).toEqual([4, 5, 6, 7, 8, 9]);
});
