import Lottos from '../model/Lottos.js';

describe('Lottos 인스턴스 테스트', () => {
  it('생성 시 내부 데이터가 초기화된다.', () => {
    const lottos = new Lottos();

    expect(lottos.getLottos()).toBeNull();
  });

  it('로또가 원하는 개수만큼 생성된다.', () => {
    const lottos = new Lottos();
    const count = 10;

    lottos.makeLottos(count);

    expect(lottos.getLottos()).toHaveLength(count);
  });

  it('로또를 초기화한다.', () => {
    const lottos = new Lottos();
    const count = 10;

    lottos.makeLottos(count);
    lottos.reset();

    expect(lottos.getLottos()).toBeNull();
  });
});
