import Lotto from '../src/Domain/Model/Lotto.js';
import { LOTTO_DEFINITION } from '../src/Domain/Constant/Definition.js';
import { sortAscending } from '../src/Utils/sorting.js';

test('로또 1장을 발행한다.', () => {
  const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
  expect(lotto.getNumbers().length).toBe(LOTTO_DEFINITION.NUMBER_COUNTS);
});

test('로또 번호는 오름차순으로 정렬한다.', () => {
  const sortedNumbers = sortAscending([6, 5, 4, 3, 2, 1]);
  const lotto = new Lotto(sortedNumbers);
  expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
});
