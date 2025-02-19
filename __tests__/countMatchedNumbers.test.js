import countMatchedNumbers from '../src/service/MatchService.js';

describe('생성된 로또 번호와 사용자의 당첨 번호 비교 테스트', () => {
  it('countMatchedCount는 두 배열을 넣었을 때 중복이 되는 숫자의 개수를 반환해야 한다.', () => {
    const a = [1, 2, 3, 4, 5, 6];
    const b = [2, 4, 6, 8, 10, 12];
    expect(countMatchedNumbers(a, b)).toBe(3);
  });
});
