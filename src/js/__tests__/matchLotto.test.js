import LottoManager from '../LottoManager';
import * as Utils from '../utils/util';

const purchasedLotto = [
  [1, 2, 3, 4, 5, 6],
  [1, 2, 3, 4, 5, 40],
  [1, 2, 3, 4, 5, 7],
  [1, 2, 3, 4, 7, 8],
  [1, 2, 3, 7, 8, 9],
  [1, 2, 7, 8, 9, 10],
];
const winningLotto = [1, 2, 3, 4, 5, 6];
const winningBonusNumber = 40;

describe('로또 당첨 확인 테스트', () => {
  it('로또 번호를 몇 개 맞췄는 지 확인할 수 있다.', () => {
    purchasedLotto.forEach(row => {
      row.forEach(cur => {
        jest.spyOn(Utils, 'generateRandomInRange').mockReturnValueOnce(cur);
      });
    });

    let lottoManager = new LottoManager();
    lottoManager.generateNewLottos(8);
    expect(lottoManager.checkWinnerLotto(winningLotto, winningBonusNumber)).toEqual([1, 1, 1, 1, 1]);
  });
});
