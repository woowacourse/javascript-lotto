import LottoModel from '../model/LottoModel';
import { ALERT_MESSAGE } from '../constants/index';

describe('로또 금액 입력 테스트', () => {
  it('로또 금액이 정상적으로 입력시 로또의 개수를 가져온다', () => {
    const lottoModel = new LottoModel();
    const correctPrice = 5000;
    lottoModel.calculateLottoCount(correctPrice);
    expect(lottoModel.getLottoCount()).toBe(5);
  });

  it('로또 금액이 1000으로 나누어떨어지지 않으면 에러를 반환한다', () => {
    const lottoModel = new LottoModel();
    const incorrectPrice = 1500;
    expect(() => {
      lottoModel.calculateLottoCount(incorrectPrice);
    }).toThrowError(ALERT_MESSAGE.DIVIDED_BY_THOUSAND);
  });

  it('로또 금액이 1000원보다 낮으면 에러를 반환한다', () => {
    const lottoModel = new LottoModel();
    const incorrectPrice = 500;
    expect(() => {
      lottoModel.calculateLottoCount(incorrectPrice);
    }).toThrowError(ALERT_MESSAGE.OVER_THOUSAND_INPUT);
  });

  it('로또 금액이 숫자가 아닐시 에러를 반환한다', () => {
    const lottoModel = new LottoModel();
    const incorrectPrice = '안녕';
    expect(() => {
      lottoModel.calculateLottoCount(incorrectPrice);
    }).toThrowError(ALERT_MESSAGE.MUST_NUMBER);
  });

  it('로또 금액이 100000만원을 초과할 시, 에러를 반환한다', () => {
    const lottoModel = new LottoModel();
    const incorrectPrice = 101000;
    expect(() => {
      lottoModel.calculateLottoCount(incorrectPrice);
    }).toThrowError(ALERT_MESSAGE.IS_OVER_MAX_LOTTO_COUNT);
  });
});

describe('로또 번호 테스트', () => {
  it('로또의 번호는 1과 45의 사이이다', () => {
    const lottoModel = new LottoModel();
    lottoModel.calculateLottoCount(1000);
    lottoModel.setLottos([[1, 2, 3, 4, 5, 6]]);
    lottoModel.getLottos()[0].forEach((lotto) => {
      expect(lotto).toBeLessThanOrEqual(45);
      expect(lotto).toBeGreaterThanOrEqual(1);
    });
  });

  it('로또는 6개의 숫자로 이루어져있다.', () => {
    const lottoModel = new LottoModel();
    lottoModel.calculateLottoCount(1000);
    lottoModel.setLottos([[1, 2, 3, 4, 5, 6]]);
    expect(lottoModel.getLottos()[0].length).toEqual(6);
  });

  it('로또의 숫자는 중복되서는 안된다', () => {
    const lottoModel = new LottoModel();
    lottoModel.calculateLottoCount(1000);
    lottoModel.setLottos([[1, 2, 3, 4, 5, 6]]);
    expect([...new Set(lottoModel.getLottos()[0])].length).toEqual(6);
  });
});
