import Lotto from '../model/Lotto';
import LottoBundle from '../model/LottoBundle';

describe('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
  test('입력받는 구입 금액은 1,000원 단위로 입력되어야 한다', () => {
    const isThousandUnit = (money) => money % 1000 === 0;
    expect(isThousandUnit(2000)).toBe(true);
  });

  test('입력받는 구입 금액은 1,000원 이상이어야 한다.', () => {
    const isCorrectRange = (money) => money >= 1000;
    expect(isCorrectRange(1000)).toBe(true);
  });

  test('사용자가 입력한 금액만큼 로또가 구매된다.', () => {
    const getLottoCount = (money) => money / 1000;

    const money = 5000;
    const lottoCount = 5;
    const lottoBundle = new LottoBundle();

    lottoBundle.createLottoBundle(getLottoCount(money));

    expect(lottoBundle.lottos.length).toBe(lottoCount);
  });
});

describe('소비자는 자동 구매를 할 수 있어야 한다.', () => {
  test('자동발급된 로또의 번호는 중복되어서는 안된다.', () => {
    const lotto = new Lotto();

    lotto.numbers = [1, 2, 3, 4, 5, 6];

    const isNumberDuplicated = (numbers) =>
      numbers.length !== new Set(numbers).size;
    expect(isNumberDuplicated(lotto.numbers)).toBe(false);
  });

  test('발급받은 로또 6개 숫자 모두가 1부터 45 범위 안에 있어야 한다.', () => {
    const isCorrectRange = (numbers) => {
      const isBelowThreshold = (number) => number >= 1 && number <= 45;

      return numbers.every(isBelowThreshold);
    };

    const lotto = new Lotto();

    lotto.numbers = [1, 2, 3, 4, 5, 6];
    expect(isCorrectRange(lotto.numbers)).toBe(true);
  });

  test('발급한 로또는 모두 각각 독립적으로 랜덤한 번호를 추천한다.', () => {
    const lottoCount = 2;

    const issuedLotto1 = [1, 2, 3, 4, 5, 6];
    const issuedLotto2 = [1, 2, 3, 4, 5, 6];

    expect(JSON.stringify(issuedLotto1)).toBe(JSON.stringify(issuedLotto2));
  });
});
