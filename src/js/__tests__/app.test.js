import LottoManager from '../model/lottoManager.js';
import { generateRandomNumberInRange } from '../utils/utils';

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    }
    return {
      message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
      pass: false,
    };
  },
});

describe('구입 금액 검증 테스트 ', () => {
  const lottoManger = new LottoManager();
  test('입력 값이 빈 칸이 아니어야 한다.', () => {
    const cashInput = '';
    expect(() => lottoManger.buyLotto(cashInput)).toThrow();
  });
  test('입력 값이 1000원 단위인지 검증한다.', () => {
    const cashInput = '1500';
    expect(() => lottoManger.buyLotto(cashInput)).toThrow();
  });
  test('입력 값의 범위가 1000 - 50000인지 검증한다.', () => {
    const cashInput = '55000';
    expect(() => lottoManger.buyLotto(cashInput)).toThrow();
  });
  test('올바른 입력 값을 입력하면 오류가 발생하지 않는다.', () => {
    const cashInput = '2000';
    expect(() => lottoManger.buyLotto(cashInput)).not.toThrow();
  });
});

describe('로또 번호 생성 테스트', () => {
  test('생성된 숫자가 1 - 45 범위인지 확인한다.', () => {
    expect(generateRandomNumberInRange(1, 45)).toBeWithinRange(1, 45);
  });

  test('범위가 1 - 45인 고유한 숫자 6개가 생성되는지 확인한다.', () => {
    const lottoManager = new LottoManager();
    lottoManager.buyLotto('5000');
    expect(lottoManager.lottos).toHaveLength(5);
    lottoManager.lottos[0].lottoNumbers.forEach((number) => expect(number).toBeWithinRange(1, 45));
  });
});
