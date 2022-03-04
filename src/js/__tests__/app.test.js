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

describe('당첨번호 입력 테스트', () => {
  it('당첨번호가 중복될시 에러를 반환한다', () => {
    const lottoModel = new LottoModel();
    lottoModel.calculateLottoCount(1000);
    lottoModel.setLottos([[1, 2, 3, 4, 5, 6]]);

    expect(() => {
      lottoModel.setWinningLottoNumbers([1, 1, 2, 3, 4, 5], 6);
    }).toThrowError(ALERT_MESSAGE.DUPLICATED_NUMBERS);
  });

  it('당첨번호가 1 ~ 45사이가 아닐시 에러를 반환한다', () => {
    const lottoModel = new LottoModel();
    lottoModel.calculateLottoCount(1000);
    lottoModel.setLottos([[1, 2, 3, 4, 5, 6]]);

    expect(() => {
      lottoModel.setWinningLottoNumbers([1, 46, 2, 3, 4, 5], 6);
    }).toThrowError(ALERT_MESSAGE.OUT_OF_RANGE);
  });

  it('당첨번호를 정상적으로 입력할시 당첨갯수를 확인할수 있다.', () => {
    const lottoModel = new LottoModel();
    lottoModel.calculateLottoCount(1000);
    lottoModel.setLottos([[1, 2, 3, 4, 5, 6]]);
    lottoModel.setWinningLottoNumbers([1, 2, 3, 4, 5, 6], 7);

    expect(lottoModel.calculateWinningNumbers()['6']).toEqual(1);
  });

  it('당첨번호를 입력하여 수익률을 확인할수 있다.', () => {
    const lottoModel = new LottoModel();
    lottoModel.calculateLottoCount(2000);
    lottoModel.setLottos([
      [1, 2, 3, 31, 5, 6],
      [1, 2, 3, 4, 9, 10],
    ]);
    lottoModel.setWinningLottoNumbers([1, 2, 3, 4, 12, 14], 34);
    lottoModel.calculateWinningNumbers();
    expect(lottoModel.calculateEarningRate()).toEqual(2750);
  });

  it('게임을 다시 시작할수 있다', () => {
    const lottoModel = new LottoModel();
    lottoModel.calculateLottoCount(2000);
    lottoModel.setLottos([
      [1, 2, 3, 31, 5, 6],
      [1, 2, 3, 4, 9, 10],
    ]);
    lottoModel.setWinningLottoNumbers([1, 2, 3, 4, 12, 14], 34);
    lottoModel.calculateWinningNumbers();
    lottoModel.initGame();

    expect(lottoModel.getLottos()).toEqual([]);
    expect(lottoModel.getLottoCount()).toEqual(0);
  });
});
