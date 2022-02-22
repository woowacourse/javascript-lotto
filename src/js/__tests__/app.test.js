// - [x] 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
// - [ ] 로또 1장의 가격은 1,000원이다.
// - [ ] 소비자는 자동 구매를 할 수 있어야 한다.
//   - 로또 한 장당 6개의 랜덤한 번호(1번~45번)를 추천한다.
//   - 발급한 로또는 모두 각각 독립적으로 랜덤한 번호를 추천한다
// - [ ] 번호 보기 토글 버튼을 클릭해 로또 번호를 볼 수 있어야 한다.

describe('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
  it('입력받는 구입 금액은 1,000원 단위로 입력되어야 한다', () => {
    const is1000Unit = (money) => money % 1000 === 0;
    expect(is1000Unit(2000)).toBe(true);
  });

  it('입력받는 구입 금액은 1,000원 이상이어야 한다.', () => {
    const isCorrectRange = (money) => money >= 1000;
    expect(isCorrectRange(1000)).toBe(true);
  });

  it('사용자가 입력한 금액만큼 로또가 구매된다.', () => {
    class Lotto {
      constructor() {
        this.numbers = [];
      }
    }

    class LottoBundle {
      constructor() {
        this.lottos = [];
      }

      createLottoBundle(count) {
        for (let index = 0; index < count; index++) {
          this.lottos.push(new Lotto());
        }
      }
    }

    const getLottoCount = (money) => money / 1000;

    const money = 5000;
    const lottoCount = 5;
    const lottoBundle = new LottoBundle();

    lottoBundle.createLottoBundle(getLottoCount(money));

    expect(lottoBundle.lottos.length).toBe(lottoCount);
  });
});
