import { ERROR_MESSAGE } from '../constants/constants';
import LottoMachine from '../machine/lottoMachine';

describe('구입 금액 검증 테스트 ', () => {
  const lottoMachine = new LottoMachine();
  test('올바른 입력 값을 입력하면 오류가 발생하지 않는다.', () => {
    const cashInput = '2000';
    expect(() => lottoMachine.buyLotto(cashInput)).not.toThrow();
  });
  test('입력 값이 빈 칸이 아니어야 한다.', () => {
    const cashInput = '';
    expect(() => lottoMachine.buyLotto(cashInput)).toThrow(ERROR_MESSAGE.EMPTY_CASH_INPUT);
  });
  test('입력 값이 1000원 단위인지 검증한다.', () => {
    const cashInput = '1500';
    expect(() => lottoMachine.buyLotto(cashInput)).toThrow(ERROR_MESSAGE.INVALID_UNIT_CASH_INPUT);
  });
  test('입력 값의 범위가 1000원 이상 50000원 이하인지 검증한다.', () => {
    // 실패 케이스
    const lowCashInput = '900';
    expect(() => lottoMachine.buyLotto(lowCashInput)).toThrow(
      ERROR_MESSAGE.OUT_OF_RANGE_CASH_INPUT
    );
    const highCashInput = '51000';
    expect(() => lottoMachine.buyLotto(highCashInput)).toThrow(
      ERROR_MESSAGE.OUT_OF_RANGE_CASH_INPUT
    );

    // 성공 케이스
    const minCashInput = '1000';
    expect(() => lottoMachine.buyLotto(minCashInput)).not.toThrow();
    const maxCashInput = '50000';
    expect(() => lottoMachine.buyLotto(maxCashInput)).not.toThrow();
  });
});
