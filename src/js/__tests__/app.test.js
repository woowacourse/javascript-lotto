import EXCEPTION from '../constants/exception';
import LOTTO from '../constants/lotto';
import Lotto from '../model/Lotto';
import LottoVendor from '../model/LottoVendor';
import LottoResult from '../model/LottoResult';

describe('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
  test('입력받는 구입 금액은 1,000원 이상이어야 한다.', () => {
    // given
    const lottoVendor = new LottoVendor();
    const delimiter = 1000;

    // when
    function setMoney(money) {
      lottoVendor.paidMoney = money;
    }

    // then
    expect(() => setMoney(delimiter)).not.toThrowError(EXCEPTION.INVALID_RANGE.MINIMUM);
  });

  test('사용자가 입력한 금액만큼 로또가 구매된다.', () => {
    // given
    const lottoCount = 5;
    const lottoVendor = new LottoVendor();
    lottoVendor.paidMoney = 5000;

    // when
    lottoVendor.saveCount();
    lottoVendor.createLottoBundle();

    // then
    expect(lottoVendor.lottos.length).toBe(lottoCount);
  });
});

describe(
  '소비자는 자동 구매를 할 수 있어야 한다.',
  () => {
    test('자동발급된 로또 한 장의 번호들 간에는 중복되어서는 안된다.', () => {
      // given
      const lotto = new Lotto();
      lotto.numbers = [1, 2, 3, 4, 5, 6];

      // when
      const isNumberDuplicated = (numbers) => numbers.length !== new Set(numbers).size;

      // then
      expect(isNumberDuplicated(lotto.numbers)).toBe(false);
    });

    test('발급받은 로또 6개 숫자 모두가 1부터 45 범위 안에 있어야 한다.', () => {
      // given
      const lotto = new Lotto();
      lotto.numbers = [1, 2, 23, 4, 5, 45];

      // when
      const isCorrectRange = (numbers) => {
        const isBelowThreshold = (number) => number >= 1 && number <= 45;

        return numbers.every(isBelowThreshold);
      };

      // then
      expect(isCorrectRange(lotto.numbers)).toBe(true);
    });
  },

  describe('당첨 결과를 확인할 수 있어야 한다.', () => {
    // given
    const lottoVendor = new LottoVendor();
    lottoVendor.lottos = [
      { numbers: [2, 1, 3, 4, 5, 6] },
      { numbers: [1, 2, 3, 24, 25, 17] },
      { numbers: [7, 1, 3, 2, 4, 5] },
      { numbers: [7, 1, 3, 2, 4, 5] },
      { numbers: [5, 1, 2, 3, 4, 8] },
      { numbers: [4, 3, 2, 1, 9, 15] },
    ];

    const lottoResult = new LottoResult(lottoVendor);
    lottoResult.winningNumbers = [1, 2, 3, 4, 5, 6];
    lottoResult.bonusNumber = 7;

    test('결과 확인하기 버튼을 누르면, 당첨번호와 구입한 로또 번호를 비교하여 당첨 금액별 당첨 번호 개수를 계산할 수 있어야 한다.', () => {
      // when
      lottoResult.calculateWinningCounts();

      // then
      expect(lottoResult.winningCounts).toStrictEqual({
        3: 1,
        4: 1,
        5: 1,
        fiveBonus: 2,
        6: 1,
      });
    });

    test('구입 금액과 당첨된 금액을 비교하여 수익률을 계산할 수 있어야 한다.', () => {
      // given
      lottoVendor.paidMoney = 1000000;

      // when
      lottoResult.calculateLottoYield();

      // then
      expect(lottoResult.lottoYield).toBe(206155);
    });
  }),
);
