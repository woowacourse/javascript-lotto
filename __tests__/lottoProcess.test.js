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
      [3, false, 5000, 0],
      [4, false, 50000, 0],
      [5, false, 1500000, 0],
      [5, true, 30000000, 0],
      [6, false, 2000000000, 1],
    ]);
  });
});
