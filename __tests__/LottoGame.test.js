import LottoGame from '../src/domain/LottoGame.js';

describe('LottoGame 클래스 테스트', () => {
  test('구매 갯수만큼 사용자 로또 번호를 생성한다.', () => {
    const lottoGame = new LottoGame();
    const PURCHASE_COUNT = 5;
    lottoGame.generateUserLottos(PURCHASE_COUNT);

    expect(lottoGame.getUserLottos().length).toBe(PURCHASE_COUNT);
  });
});
