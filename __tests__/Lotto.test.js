import Lotto from "../src/domain/Lotto.js";

test("로또 번호는 숫자 배열이 입력되면, 로또 숫자를 필드로 갖는다", () => {
  // given
  const numbers = [1, 2, 3, 4, 5, 6];

  // when
  const lotto = new Lotto(numbers);

  // then
  expect(lotto.numbers).toEqual(numbers);
});
