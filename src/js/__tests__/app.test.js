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
    const lottoList = [
      [1, 2, 3, 4, 5, 6],
      [4, 5, 6, 7, 8, 9],
      [4, 5, 6, 7, 8, 10],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
    ];

    const pickedNumber = [4, 5, 6, 7, 8, 9, 10];

    const model = new Model();
    model.setLottoList(lottoList);
    model.setCash(lottoList.length * LOTTO_PRICE);
    model.setWinningLottoQuantity(pickedNumber);

    const winningLottoQuantity = model.getWinningLottoQuantity();

    expect(winningLottoQuantity[3]).toBe(2);
    expect(winningLottoQuantity[4]).toBe(0);
    expect(winningLottoQuantity[5]).toBe(0);
    expect(winningLottoQuantity[5.5]).toBe(1);
    expect(winningLottoQuantity[6]).toBe(1);
    expect(model.calculateProfitRatio()).toBe(40600200);
  });
});
