import LottoUser from '../model/lottoUser';

describe('lottoUser 모델 테스트', () => {
  test('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급한다', () => {
    // given
    const lottoUser = new LottoUser();
    const qunatity = 10;
    // when
    lottoUser.buyLotto(qunatity);
    // then
    expect(lottoUser.getBuyedLottos().length).toBe(qunatity);
  });

  test('당첨번호를 입력하면 로또 당첨 현황을 저장한다.', () => {
    // given
    const lottoUser = new LottoUser();
    lottoUser.buyLotto(100);
    // when
    lottoUser.setLottoResult([1, 2, 3, 4, 5, 6], 7);
    // then
    expect(lottoUser.getLottoStatus().size).toBe(6);
  });

  test('lottoUser 정보를 초기화 한다.', () => {
    // given
    const lottoUser = new LottoUser();
    lottoUser.buyLotto(10);
    lottoUser.setLottoResult([1, 2, 3, 4, 5, 6], 7);
    // when
    lottoUser.reset();
    // then
    expect(lottoUser.getBuyedLottos().length).toBe(0);
    expect(lottoUser.getLottoStatus().length).toBe(0);
    expect(lottoUser.getProfitRate()).toBe(0);
  });
});
