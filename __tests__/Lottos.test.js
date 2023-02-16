const Lottos = require('../src/domain/model/Lottos');

describe('Lottos 테스트', () => {
  test('로또 개수에 맞는 Lotto 인스턴스 생성 기능', () => {
    // given
    const lottoCount = 10;

    // when
    const lottos = new Lottos(lottoCount);
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    // then
    expect(lottos.getLottos().length).toEqual(lottoCount);
  });
});
