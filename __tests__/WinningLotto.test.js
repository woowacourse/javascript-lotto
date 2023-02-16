import WinningLotto from '../src/domain/WinningLotto';
import Lotto from '../src/domain/Lotto';
import Validator from '../src/domain/Validator';

describe('WinningLotto 클래스 테스트', () => {
  test('당첨 로또 객체를 생성하면 당첨 로또 번호와 보너스 번호가 저장된다.', () => {
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);

    const winningLottoNumber = winningLotto.getLottoNumber();
    const bonusNumber = winningLotto.getBonusNumber();

    expect([winningLottoNumber, bonusNumber]).toEqual([[1, 2, 3, 4, 5, 6], 7]);
  });

  test('보너스 번호는 당첨번호와 중복되지 않는다.', () => {
    expect(() => {
      Validator.validateBonusNumberDuplicated([1, 2, 3, 4, 5, 6], 2);
    }).toThrow('[ERROR]');
  });

  test('보너스 번호가 1~45 사이의 숫자가 아니라면 예외 처리', () => {
    expect(() => {
      Validator.validateBonusNumberRange(50);
    }).toThrow('[ERROR]');
  });

  test('구입한 로또 번호가 당첨 번호와 3개 일치할 경우 5등 당첨, 5개 일치 및 보너스 번호 일치시 2등 당첨', () => {
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);
    const purchasedLotto1 = new Lotto([4, 5, 6, 7, 8, 9]);
    const purchasedLotto2 = new Lotto([1, 2, 3, 4, 5, 7]);

    const rank1 = winningLotto.calculateRank(purchasedLotto1);
    const rank2 = winningLotto.calculateRank(purchasedLotto2);

    expect(rank1).toBe(5);
    expect(rank2).toBe(2);
  });
});
