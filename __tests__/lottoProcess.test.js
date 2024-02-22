import Lotto from '../src/domain/Lotto';
import LottoProcess from '../src/domain/LottoProcess';

describe('LottoProcess 클래스 검사', () => {
  test('당첨 번호와 로또 번호가 몇개 일치하는지 확인', () => {
    const lottos = [new Lotto([1, 2, 3, 4, 5, 6])];
    const winLotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const lottoProcess = new LottoProcess(lottos);
    expect(lottoProcess.matchLottoNumbers(lottos[0], winLotto)).toBe(6);
  });

  test('당첨결과를 배열로 반환', () => {
    const lottos = [new Lotto([1, 2, 3, 4, 5, 6])];
    const winLotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 7;
    const lottoProcess = new LottoProcess(lottos);

    expect(lottoProcess.getResult(winLotto, bonusNumber)).toEqual([
      [3, false, 5_000, 0],
      [4, false, 50_000, 0],
      [5, false, 1_500_000, 0],
      [5, true, 30_000_000, 0],
      [6, false, 2_000_000_000, 1],
    ]);
  });

  test('모든 로또의 숫자를 배열로 잘 반환하는지 확인', () => {
    const lotto1 = new Lotto([1, 2, 3, 4, 5, 6]);
    const lotto2 = new Lotto([5, 10, 15, 20, 25, 30]);
    const lottoProcess = new LottoProcess([lotto1, lotto2]);

    expect(lottoProcess.getAllLottosNumbers()).toEqual([
      [1, 2, 3, 4, 5, 6],
      [5, 10, 15, 20, 25, 30],
    ]);
  });
});
