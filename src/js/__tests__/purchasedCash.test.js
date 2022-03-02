import { ERROR_MESSAGE } from '../constants/constants';
import LottoGenerator from '../model/lottoGenerator';

describe('구입 금액 검증 테스트 ', () => {
  const lottoGenerator = new LottoGenerator();
  test('입력 값이 빈 칸이 아니어야 한다.', () => {
    const cashInput = '';
    expect(() => lottoGenerator.buyLotto(cashInput)).toThrow(ERROR_MESSAGE.EMPTY_INPUT);
  });
  test('입력 값의 범위가 1000 - 50000인지 검증한다.', () => {
    const cashInput = '55000';
    expect(() => lottoGenerator.buyLotto(cashInput)).toThrow(ERROR_MESSAGE.OUT_OF_RANGE);
  });
  test('입력 값이 1000 단위인지 검증한다.', () => {
    const cashInput = '1500';
    expect(() => lottoGenerator.buyLotto(cashInput)).toThrow(ERROR_MESSAGE.INVALID_UNIT);
  });
  test('올바른 입력 값을 입력하면 오류가 발생하지 않는다.', () => {
    const cashInput = '1000';
    expect(() => lottoGenerator.buyLotto(cashInput)).not.toThrow();
  });
});
