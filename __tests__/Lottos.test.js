const Lottos = require('../src/domain/model/Lottos');

describe('Lottos 테스트', () => {
  test('로또 개수만큼 Lotto 객체를 생성하는 Lottos 인스턴스를 생성해야 한다. ', () => {
    const lottoCount = 1000;

    const lottos = new Lottos(lottoCount);
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    lottos.calculateAllRanks(winningNumbers, bonusNumber);

    expect(lottos.getLottos().length).toEqual(lottoCount);
  });
});
