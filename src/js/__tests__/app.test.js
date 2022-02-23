import LottoModel from '../model/LottoModel';

describe('로또 금액 입력 테스트', () => {
  it('로또 금액이 정상적으로 입력시 로또의 개수를 가져온다', () => {
    const lottoModel = new LottoModel();
    const correctPrice = '5000';
    lottoModel.setLottoCount(correctPrice);
    expect(lottoModel.getLottoCount()).toBe(5);
  });

  it('로또 금액이 1000으로 나누어떨어지지 않으면 에러를 반환한다', () => {
    const lottoModel = new LottoModel();
    const incorrectPrice = '1500';
    expect(() => {
      lottoModel.setLottoCount(incorrectPrice);
    }).toThrowError('1000으로 나누어 떨어지는 값을 입력해주세요');
  });

  it('로또 금액이 1000원보다 낮으면 에러를 반환한다', () => {
    const lottoModel = new LottoModel();
    const incorrectPrice = '500';
    expect(() => {
      lottoModel.setLottoCount(incorrectPrice);
    }).toThrowError('1000원 이상을 입력해주세요.');
  });

  it('로또 금액이 숫자가 아닐시 에러를 반환한다', () => {
    const lottoModel = new LottoModel();
    const incorrectPrice = '안녕';
    expect(() => {
      lottoModel.setLottoCount(incorrectPrice);
    }).toThrowError('숫자를 입력하세요.');
  });
});

describe('로또 번호 테스트', () => {
  it('로또의 번호는 1과 45의 사이이다', () => {
    const lottoModel = new LottoModel();
    lottoModel.setLottoCount('1000');
    lottoModel.setLottos();
    lottoModel.getLottos()[0].forEach((lotto) => {
      expect(lotto).toBeLessThanOrEqual(45);
      expect(lotto).toBeGreaterThanOrEqual(1);
    });
  });

  it('로또는 6개의 숫자로 이루어져있다.', () => {
    const lottoModel = new LottoModel();
    lottoModel.setLottoCount('1000');
    lottoModel.setLottos();
    expect(lottoModel.getLottos()[0].length).toEqual(6);
  });

  it('로또의 숫자는 중복되서는 안된다', () => {
    const lottoModel = new LottoModel();
    lottoModel.setLottoCount('1000');
    lottoModel.setLottos();
    expect([...new Set(lottoModel.getLottos()[0])].length).toEqual(6);
  });
});
