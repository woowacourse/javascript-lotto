import Lottos from '../model/Lottos.js';

describe('Lottos 인스턴스 객체 생성 테스트', () => {
  it('Lottos 인스턴스 객체 생성 시, 데이터가 초기화되어야 한다.', () => {
    const lottos = new Lottos();

    expect(lottos.getLottos()).toBeNull();
  });

  it('전달 매개변수 값에 따른 원하는 로또 개수가 생성되어야 한다.', () => {
    const lottos = new Lottos();
    const count = 10;

    expect(lottos.makeLottos(count)).toHaveLength(count);
  });
});
