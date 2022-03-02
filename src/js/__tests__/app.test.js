import { ALERT_MESSAGE, LOTTO_PRICE, LOTTO_RULE } from '../constants';
import Model from '../model';
import { validateCashInput } from '../utils/validation';

describe('로또 구매 테스트', () => {
  test('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
    const model = new Model();
    const lottoQuantity = 10;
    model.buyLotto(lottoQuantity);
    expect(model.getLottoList().length).toBe(lottoQuantity);
  });

  test(`로또 구입 금액을 입력하면, 로또 1개당 ${LOTTO_RULE.NUMBERS_COUNT}개의 번호가 할당된다.`, () => {
    const model = new Model();
    expect(model.makeLottoNumbers().length).toBe(LOTTO_RULE.NUMBERS_COUNT);
  });

  test(`로또 번호는 ${LOTTO_RULE.MIN_NUMBER} 이상 ${LOTTO_RULE.MAX_NUMBER} 이하이다.`, () => {
    const model = new Model();
    const lottoNumbers = model.makeLottoNumbers();

    const isIncluded = Array.from(lottoNumbers).every(aNumber => {
      return LOTTO_RULE.MIN_NUMBER <= aNumber && aNumber <= LOTTO_RULE.MAX_NUMBER;
    });

    expect(isIncluded).toBeTruthy();
  });

  test(`로또 구입 금액을 입력했을 때, 금액이 ${LOTTO_PRICE}원으로 나눠떨어지지 않으면 에러를 생성한다.`, () => {
    const cash = 1500;
    expect(() => validateCashInput(cash)).toThrowError(ALERT_MESSAGE.NOT_DIVISIBLE);
  });

  test('결과 확인하기 버튼을 누르면, 당첨 갯수와 수익률이 정확히 계산된다', () => {
    // lottoList 가 있고
    // pickedNumbers가 있고
    // 비교하는 함수가 있고
    // 3,4,5,5.5,6 이 일치하는지 확인하고,
    // 수익률이 일치하는지 확인한다.

    const lottoList = [
      [1, 2, 3, 4, 5, 6],
      [4, 5, 6, 7, 8, 9],
      [4, 5, 6, 7, 8, 10],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
    ];

    const cash = lottoList.length * LOTTO_PRICE;

    const pickedNumber = [4, 5, 6, 7, 8, 9, 10];

    const winningLottos = {
      3: 0,
      4: 0,
      5: 0,
      5.5: 0,
      6: 0,
    };

    const winningPrize = {
      3: 5000,
      4: 50000,
      5: 1500000,
      5.5: 30000000,
      6: 2000000000,
    };

    function countSameNumber(arr1, arr2) {
      const winningNumbers = arr2.slice(0, 6);
      const bonusNumber = arr2.slice(-1)[0];

      const winningCount = winningNumbers.filter(element => arr1.includes(element)).length;
      if (winningCount === 5 && arr1.includes(bonusNumber)) {
        return 5.5;
      }

      return winningCount;
    }

    lottoList.map(lotto => {
      winningLottos[countSameNumber(lotto, pickedNumber)] += 1;
    });

    expect(winningLottos[3]).toBe(2);
    expect(winningLottos[5.5]).toBe(1);
    expect(winningLottos[6]).toBe(1);
    let totalProfit = 0;
    for (let key in winningPrize) {
      totalProfit += winningPrize[key] * winningLottos[key];
    }
    let profitRatio = (totalProfit / cash) * 100;
    expect(profitRatio).toBe(40600200);
  });
});
