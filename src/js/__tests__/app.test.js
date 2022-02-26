import LOTTO from '../constants/lotto';
import Lotto from '../model/Lotto';
import LottoBundle from '../model/LottoBundle';

describe('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
  test('입력받는 구입 금액은 1,000원 단위로 입력되어야 한다', () => {
    const delimiter = 1000;
    const isThousandUnit = (money) => money % 1000 === 0;

    expect(isThousandUnit(delimiter)).toBe(true);
  });

  test('입력받는 구입 금액은 1,000원 이상이어야 한다.', () => {
    const delimiter = 1000;
    const isCorrectRange = (money) => money >= 1000;

    expect(isCorrectRange(delimiter)).toBe(true);
  });

  test('사용자가 입력한 금액만큼 로또가 구매된다.', () => {
    const lottoCount = 5;

    const model = new LottoBundle();
    model.setMoney(5000);
    model.setCount();
    model.createLottoBundle();

    expect(model.lottos.length).toBe(lottoCount);
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
    const lotto = new Lotto();
    lotto.numbers = [1, 2, 3, 4, 5, 6];
    const isCorrectRange = (numbers) => {
      const isBelowThreshold = (number) => number >= 1 && number <= 45;

      return numbers.every(isBelowThreshold);
    };

    expect(isCorrectRange(lotto.numbers)).toBe(true);
  });
  test('발급한 로또는 모두 각각 독립적으로 랜덤한 번호를 추천한다.', () => {
    let trialNumber = 100;
    let differentCount = 0;
    let totalCount = 0;

    const model = new LottoBundle();
    model.setMoney(1000000);
    model.setCount();
    model.createLottoBundle();

    for (let i = 0; i < trialNumber; i++) {
      for (let j = i + 1; j < trialNumber; j++) {
        totalCount += 1;
        if (
          JSON.stringify(model.lottos[i].numbers) !==
          JSON.stringify(model.lottos[j].numbers)
        ) {
          differentCount += 1;
        }
      }
    }

    expect(differentCount / totalCount).toBeGreaterThanOrEqual(0.99);
  });
});
