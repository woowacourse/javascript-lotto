import rankToString from '../src/utils/rankToString.js';
import { PRIZE_MESSAGES } from '../src/view/constants.js';

test.each([['first'], ['second'], ['third'], ['fourth'], ['fifth']])(
  '등수 %s가 인자 값으로 들어올 시 해당 등수에 맞는 문구로 변환하여 반환한다.',
  (prize) => {
    expect(rankToString(prize)).toBe(PRIZE_MESSAGES[prize]);
  },
);

test('당첨되지 않은 등수가 들어올 경우는 빈 문자열을 반환한다.', () => {
  const prize = 'none';

  expect(rankToString(prize)).toBe('');
});
