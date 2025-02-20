import Lotto from '../src/Domain/Model/Lotto.js';
import WinningLotto from '../src/Domain/Model/WinningLotto.js';
import { LOTTO_DEFINITION } from '../src/Domain/Constant/Definition.js';
import { sortAscending } from '../src/Utils/sorting.js';

test('입력받은 당첨 번호와 보너스 번호를 토대로 당첨 로또를 발행한다.', () => {
  const sortedNumbers = sortAscending([1, 2, 3, 4, 5, 6]);
  const bonusNumber = 7;
  const lotto = new WinningLotto(sortedNumbers, bonusNumber);
  expect(lotto.getNumbers().length).toBe(LOTTO_DEFINITION.NUMBER_COUNTS);
  expect(lotto.getBonusNumber()).toBe(7);
});

test('일반 로또 하나와 당첨 로또를 비교해서 번호가 같은 개수를 구한다.', () => {
  const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);
  const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
  expect(winningLotto.countMatchingNumbers(lotto)).toBe(6);
});
