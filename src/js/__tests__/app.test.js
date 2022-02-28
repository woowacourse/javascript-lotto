import Lotto from '../model/Lotto';
import LottoBundle from '../model/LottoBundle';
import LOTTO from '../constants/lotto.js';
import autoComma from '../utils/autoComma.js';

describe('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
  test(`입력받는 구입 금액은 ${autoComma(
    LOTTO.PRICE_PER_TICKET,
  )}원 단위로 입력되어야 한다`, () => {
    const inputMoney = 1000;
    const isCorrectUnit = (money, pricePerTicket) =>
      money % pricePerTicket === 0;

    expect(isCorrectUnit(inputMoney, LOTTO.PRICE_PER_TICKET)).toBe(true);
  });

  test(`입력받는 구입 금액은 ${autoComma(
    LOTTO.PRICE_PER_TICKET,
  )}원 이상이어야 한다.`, () => {
    const inputMoney = 1000;
    const isCorrectRange = (money, pricePerTicket) => money >= pricePerTicket;

    expect(isCorrectRange(inputMoney, LOTTO.PRICE_PER_TICKET)).toBe(true);
  });

  test('사용자가 입력한 금액만큼 로또가 구매된다.', () => {
    const inputMoney = 5000;
    const lottoBundle = new LottoBundle();
    const getLottoCount = (money, pricePerTicket) => money / pricePerTicket;

    lottoBundle.createLottoBundle(
      getLottoCount(inputMoney, LOTTO.PRICE_PER_TICKET),
    );
    expect(lottoBundle.lottos.length).toBe(inputMoney / LOTTO.PRICE_PER_TICKET);
  });
});

describe('소비자는 자동 구매를 할 수 있어야 한다.', () => {
  test('자동발급된 로또의 번호는 중복되어서는 안된다.', () => {
    const generatedLottoNumbers = [1, 2, 3, 4, 5, 6];
    const isNumberDuplicated = (numbers) =>
      numbers.length !== new Set(numbers).size;

    const lotto = new Lotto();
    lotto.numbers = generatedLottoNumbers;

    expect(isNumberDuplicated(lotto.numbers)).toBe(false);
  });

  test(`발급받은 로또 ${LOTTO.NUMBER_COUNT}개 숫자 모두가 ${LOTTO.MIN_NUMBER}부터 ${LOTTO.MAX_NUMBER} 범위 안에 있어야 한다.`, () => {
    const generatedLottoNumbers = [1, 2, 3, 4, 5, 6];
    const isCorrectRange = (numbers) => {
      const isBelowThreshold = (number) =>
        number >= LOTTO.MIN_NUMBER && number <= LOTTO.MAX_NUMBER;

      return numbers.every(isBelowThreshold);
    };

    const lotto = new Lotto();
    lotto.numbers = generatedLottoNumbers;

    expect(isCorrectRange(lotto.numbers)).toBe(true);
  });

  test('발급한 로또는 모두 각각 독립적으로 랜덤한 번호를 추천한다.', () => {
    const issuedLotto1 = [1, 2, 3, 4, 5, 6];
    const issuedLotto2 = [7, 8, 9, 1, 2, 3];

    expect(JSON.stringify(issuedLotto1.sort())).not.toBe(
      JSON.stringify(issuedLotto2.sort()),
    );
  });
});
