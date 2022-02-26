import LottoGameModel from '../models/LottoGame';
import { deepCopy } from '../utils/copy';

describe('로또 모델 테스트', () => {
  it('deepCopy 함수는 배열을 인자로 받으면 깊은 복사를 수행한 배열을 반환한다.', () => {
    const lottoGame = new LottoGameModel();
    const charge = 5000;

    lottoGame.createLottoList(charge);

    const originalLottoList = lottoGame.getLottoList();
    expect(originalLottoList !== deepCopy(originalLottoList)).toBe(true);
  });
});
