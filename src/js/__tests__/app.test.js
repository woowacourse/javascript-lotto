import { ALERT_MESSAGE, LOTTO_NUMBERS } from '../constants';
import LottoModel from '../model/LottoModel';

describe('로또 금액 입력 테스트', () => {
  it('로또 금액이 정상적으로 입력시 로또의 개수를 가져온다', () => {
    const lottoQuantity = 5;
    const lottoModel = new LottoModel();
    const correctPrice = LOTTO_NUMBERS.LOTTO_PRICE * lottoQuantity;

    lottoModel.buyLottos(correctPrice);
    expect(lottoModel.getLottoCount()).toBe(lottoQuantity);
  });

  it('로또 금액이 1000으로 나누어떨어지지 않으면 에러를 반환한다', () => {
    const lottoModel = new LottoModel();
    const incorrectPrice = 1500;
    expect(() => {
      lottoModel.buyLottos(incorrectPrice);
    }).toThrowError(ALERT_MESSAGE.DIVIDED_BY_THOUSAND);
  });

  it('로또 금액이 1000원보다 낮으면 에러를 반환한다', () => {
    const lottoModel = new LottoModel();
    const incorrectPrice = 500;
    expect(() => {
      lottoModel.buyLottos(incorrectPrice);
    }).toThrowError(ALERT_MESSAGE.OVER_THOUSAND_INPUT);
  });

  it('로또 금액이 숫자가 아닐시 에러를 반환한다', () => {
    const lottoModel = new LottoModel();
    const incorrectPrice = '안녕';

    expect(() => {
      lottoModel.buyLottos(incorrectPrice);
    }).toThrowError(ALERT_MESSAGE.MUST_NUMBER);
  });
});

describe('로또 번호 테스트', () => {
  it('로또의 번호는 1과 45의 사이이다', () => {
    const lottoModel = new LottoModel();

    lottoModel.setLottos([[1, 2, 3, 4, 5, 6]]);
    lottoModel.getLottos()[0].forEach((lotto) => {
      expect(lotto).toBeLessThanOrEqual(45);
      expect(lotto).toBeGreaterThanOrEqual(1);
    });
  });

  it('로또는 6개의 숫자로 이루어져있다.', () => {
    const lottoModel = new LottoModel();

    lottoModel.setLottos([[1, 2, 3, 4, 5, 6]]);
    expect(lottoModel.getLottos()[0].length).toEqual(6);
  });

  it('로또의 숫자는 중복되서는 안된다', () => {
    const lottoModel = new LottoModel();

    lottoModel.setLottos([[1, 2, 3, 4, 5, 6]]);
    expect([...new Set(lottoModel.getLottos()[0])].length).toEqual(6);
  });
});

describe('당첨번호 입력 테스트', () => {
  it('당첨번호가 중복될시 에러를 반환한다', () => {
    const lottoModel = new LottoModel();
    lottoModel.setLottos([[1, 2, 3, 4, 5, 6]]);

    expect(() => {
      lottoModel.setWinningLottoNumbers([1, 1, 2, 3, 4, 5], 6);
    }).toThrowError(ALERT_MESSAGE.DUPLICATED_NUMBERS);
  });

  it('당첨번호가 1 ~ 45사이가 아닐시 에러를 반환한다', () => {
    const lottoModel = new LottoModel();
    lottoModel.setLottos([[1, 2, 3, 4, 5, 6]]);

    expect(() => {
      lottoModel.setWinningLottoNumbers([1, 46, 2, 3, 4, 5], 6);
    }).toThrowError(ALERT_MESSAGE.OUT_OF_BOUNDS);
  });

  it('당첨번호를 정상적으로 입력할시 당첨갯수를 확인할수 있다.', () => {
    const lottoModel = new LottoModel();
    lottoModel.setLottos([[1, 2, 3, 4, 5, 6]]);
    lottoModel.calculateLottoResult([1, 2, 3, 4, 5, 6], 7);
    expect(lottoModel.getLottoResultInfo().winningType['6']).toEqual(1);
  });

  it('당첨번호를 입력하여 수익률을 확인할수 있다.', () => {
    const lottoModel = new LottoModel();
    lottoModel.setLottos([
      [1, 2, 3, 31, 5, 6],
      [1, 2, 3, 4, 9, 10],
    ]);
    lottoModel.calculateLottoResult([1, 2, 3, 4, 12, 14], 34);

    expect(lottoModel.getLottoResultInfo().earningRate).toEqual(2750);
  });

  it('게임을 다시 시작할수 있다', () => {
    const lottoModel = new LottoModel();

    lottoModel.setLottos([
      [1, 2, 3, 31, 5, 6],
      [1, 2, 3, 4, 9, 10],
    ]);
    lottoModel.calculateLottoResult([1, 2, 3, 4, 12, 14], 34);
    lottoModel.initGame();

    expect(lottoModel.getLottos()).toEqual([]);
    expect(lottoModel.getLottoCount()).toEqual(0);
  });
});
