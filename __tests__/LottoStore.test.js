import LottoStore from '../src/step-1/LottoStore.js';
import Lotto from '../src/step-1/Lotto.js';

describe('LottoStore 클래스 유닛 테스트', () => {
  describe('purchaseLotto', () => {
    test('구입 금액을 받아서 로또 인스턴스를 반환한다.', () => {
      // given
      const amount = 1000;

      // when
      const lottos = LottoStore.purchaseLottos(amount);

      // then
      lottos.forEach((lotto) => {
        expect(lotto).toBeInstanceOf(Lotto);
      });
    });

    test('1000원에 1개씩 로또 인스턴스를 반환한다.', () => {
      // given
      const amount = 3000;

      // when
      const lottos = LottoStore.purchaseLottos(amount);

      // then
      expect(lottos.length).toBe(3);
    });
  });

  describe('createRandomLotto', () => {
    test('랜덤한 로또 번호를 가지는 로또 인스턴스를 반환한다.', () => {
      // when
      const lotto = LottoStore.createRandomLotto();

      // then
      expect(lotto).toBeInstanceOf(Lotto);
    });
  });
});
