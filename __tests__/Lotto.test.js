import Lotto from "../src/domain/Lotto.js";

test("로또 번호를 오름차순으로 정렬한다.", () => {
  const numbers = [9, 8, 7, 6, 5, 4];
  const lotto = new Lotto(numbers);

  expect(lotto.numbers).toEqual([4, 5, 6, 7, 8, 9]);
});

test.each([
  [[1, 2, 3, 4, 5, 6], 6],
  [[2, 3, 4, 5, 6, 7], 5],
  [[3, 4, 5, 6, 7, 8], 4],
  [[4, 5, 6, 7, 8, 9], 3],
  [[5, 6, 7, 8, 9, 10], 2],
  [[6, 7, 8, 9, 10, 11], 1],
])(
  "상대 로또 번호와 자신의 로또 번호가 서로 몇개 매칭되는지 판단한다",
  (otherLotto, answer) => {
    console.log(otherLotto);
    const myLottos = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto(myLottos);

    expect(lotto.compareMatchingNumbers(otherLotto)).toBe(answer);
  }
);
