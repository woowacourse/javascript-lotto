const LottoGameController = require('../src/controller/LottoGameController');

describe('로또 게임을 진행하는 Controller의 기능 테스트', () => {
  test('구입 금액에 따른 로또 개수를 반환해야 한다.', () => {
    const lottoGameController = new LottoGameController();
    const purchasePrice = '8000';

    const lottoCount = lottoGameController.calculateLottoCount(purchasePrice);

    expect(lottoCount).toBe(8);
  });
});
