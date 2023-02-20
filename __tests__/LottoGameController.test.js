/*eslint-disable */
const Validator = require('../src/domain/validation/validator');

describe('기능 테스트', () => {
  test('구입 금액에 따라 로또 개수 반환하기', () => {
    //given
    const LottoGameController = require('../src/controller/LottoGameController');
    const lottoGameController = new LottoGameController();
    const purchasePrice = '8000';

    //when
    const lottoCount = lottoGameController.calculateLottoCount(purchasePrice);

    //then
    expect(lottoCount).toBe(8);
  });
});
