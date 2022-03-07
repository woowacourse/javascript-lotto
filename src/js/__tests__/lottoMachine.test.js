import LottoMachine from '../domains/LottoMachine.js';
import { LOTTO, RESULT } from '../constants/constants.js';

class TestStrategy {
  constructor() {}
  pickNumbers() {
    return [1, 2, 3, 4, 9, 7];
  }
}

describe('로또 기계 단위 테스트', () => {
  let lottoMachine;
  const validInputMoney = '1000';
  beforeEach(() => {
    lottoMachine = new LottoMachine();
    lottoMachine.updateStrategy(new TestStrategy());
    lottoMachine.inputMoney = validInputMoney;
    lottoMachine.operateLottoMachine();
  });
  test('로또 기계는 투입금액에서 로또 가격을 나눈 개수만큼의 로또를 발급해야 한다.', () => {
    expect(lottoMachine.lottos).toHaveLength(validInputMoney / LOTTO.PRICE);
  });

  test('로또 개수에 맞는 개수를 알아야 한다.', () => {
    lottoMachine.calculateGrade([1, 2, 3, 4, 5, 6], 7);
    expect(lottoMachine.getNumberOfGrade(RESULT.FOURTH.NAME)).toBe(1);
  });

  test('올바른 수익률을 계산할 수 있어야 한다..', () => {
    lottoMachine.calculateGrade([1, 2, 3, 4, 5, 6], 7);
    expect(lottoMachine.profitRate).toBe('5000.00');
  });
});
