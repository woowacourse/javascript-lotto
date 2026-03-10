import Lotto from '../src/Lotto.js';
import WinningLotto from '../src/WinningLotto.js';

describe('WinningLotto 클래스 유닛 테스트', () => {
  describe('생성자', () => {
    test('보너스 번호가 당첨 번호 안에 포함되면 예외를 반환한다.', () => {
      // given
      const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const bonusNumber = 6;

      // when & then
      expect(() => new WinningLotto(winningLotto, bonusNumber)).toThrow('당첨 번호와 보너스 번호는 중복될 수 없습니다.');
    });
  });
});
