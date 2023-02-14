import Lotto from "../src/Lotto";

test('숫자 6개를 받아 로또를 발행한다.', () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto(numbers);
    expect(lotto.numbers).toEqual([1, 2, 3, 4, 5, 6]);
})
