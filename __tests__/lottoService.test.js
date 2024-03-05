import Lotto from '../src/domain/Lotto';
import LottoService from '../src/domain/LottoService';

describe('LottoProcess 클래스의 당첨 결과값을 담은 배열이 정상 반환되는지 확인하는 테스트입니다.', () => {
  

  test('1등일때 당첨결과를 배열로 반환합니다.', () => {
    const randomLottos = [new Lotto([1, 2, 3, 4, 5, 6])];
    const winLotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 7;

    expect(LottoService.getResult({randomLottos, winLotto, bonusNumber})).toEqual([
      [3, false, 5_000, 0],
      [4, false, 50_000, 0],
      [5, false, 1_500_000, 0],
      [5, true, 30_000_000, 0],
      [6, false, 2_000_000_000, 1],
    ]);
  });
});
