import WinningLotto from '../src/domain/object/WinningLotto';
import Lotto from '../src/domain/object/Lotto';
import Validator from '../src/domain/Validator';

describe('WinningLotto 클래스 테스트', () => {
  test('당첨 로또 객체를 생성하면 당첨 로또 번호와 보너스 번호가 저장된다.', () => {
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);

    const winningLottoNumber = winningLotto.getLottoNumber();
    const bonusNumber = winningLotto.getBonusNumber();

    expect([winningLottoNumber, bonusNumber]).toEqual([[1, 2, 3, 4, 5, 6], 7]);
  });

  test('보너스 번호는 1~45 사이의 숫자 하나를 입력해야 하고, 당첨 번호와 중복되지 않아야 한다.', () => {
    const lottoNumber = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    expect(() => {
      new WinningLotto(lottoNumber, bonusNumber);
      return true;
    }).toBeTruthy();
  });

  test('보너스 번호가 당첨번호와 중복될 경우 에러가 발생한다.', () => {
    const lottoNumber = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 6;

    expect(() => {
      new WinningLotto(lottoNumber, bonusNumber);
    }).toThrow();
  });

  test('보너스 번호가 1~45 사이의 숫자가 아니라면 에러가 발생한다.', () => {
    const lottoNumber = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 46;

    expect(() => {
      new WinningLotto(lottoNumber, bonusNumber);
    }).toThrow();
  });

  test('구입한 로또 번호가 당첨 번호와 3개 일치할 경우 5등 당첨, 5개 일치 및 보너스 번호 일치시 2등 당첨', () => {
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);

    const sixMatchLotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const fiveMatchAndBonusMatchLotto = new Lotto([1, 2, 3, 4, 5, 7]);
    const fiveMatchLotto = new Lotto([1, 2, 3, 4, 5, 45]);
    const fourMatchLotto = new Lotto([1, 2, 3, 4, 44, 45]);
    const threeMatchLotto = new Lotto([1, 2, 3, 43, 44, 45]);

    const rank1 = winningLotto.calculateRank(sixMatchLotto);
    const rank2 = winningLotto.calculateRank(fiveMatchAndBonusMatchLotto);
    const rank3 = winningLotto.calculateRank(fiveMatchLotto);
    const rank4 = winningLotto.calculateRank(fourMatchLotto);
    const rank5 = winningLotto.calculateRank(threeMatchLotto);

    expect(rank1).toBe(1);
    expect(rank2).toBe(2);
    expect(rank3).toBe(3);
    expect(rank4).toBe(4);
    expect(rank5).toBe(5);
  });
});
