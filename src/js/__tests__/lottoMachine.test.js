<<<<<<< HEAD
import LottoMachine from '../domains/LottoMachine.js';
import { LOTTO } from '../constants/constants.js';

describe('로또 기계 단위 테스트', () => {
  test('로또 기계는 투입금액에서 로또 가격을 나눈 개수만큼의 로또를 발급해야 한다.', () => {
    const validInputMoney = '6000';
    const lottoMachine = new LottoMachine();
    lottoMachine.inputMoney = validInputMoney;
    lottoMachine.operateLottoMachine();
    expect(lottoMachine.lottos).toHaveLength(validInputMoney / LOTTO.PRICE);
=======
// - [ ] 로또 기계는 투입금액에서 로또 가격을 나눈 개수만큼의 로또를 발급해야 한다.
// - [ ] 소비자는 금액 투입 시 로또 가격의 배수만을 투입하여야 한다.
import LottoMachine from '../domains/LottoMachine.js';
import { LOTTO } from '../constants/constants.js';

function isValidInputMoney(money) {
  return money % LOTTO_PRICE === 0;
}

<<<<<<< HEAD
describe("로또 기계 단위 테스트", () => {
  test("로또 기계는 투입금액에서 로또 가격을 나눈 개수만큼의 로또를 발급해야 한다.", () => {
<<<<<<< HEAD
    const lottos = [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6],
    ];
    expect(lottos).toHaveLength(validInputMoney / LOTTO.PRICE);
>>>>>>> 0d4f4f9 (refactor: 로또 관련 상수 결합)
=======
    const validInputMoney = "6000";
=======
describe('로또 기계 단위 테스트', () => {
  test('로또 기계는 투입금액에서 로또 가격을 나눈 개수만큼의 로또를 발급해야 한다.', () => {
    const validInputMoney = '6000';
>>>>>>> a161b95 (feat: 로또 금액을 입력받아 저장하도록 구현)
    const lottoMachine = new LottoMachine();
    lottoMachine.inputMoney = validInputMoney;
    lottoMachine.operateLottoMachine();
    expect(lottoMachine.lottos).toHaveLength(validInputMoney / LOTTO.PRICE);
>>>>>>> e00c8b0 (feat: 로또 기계가 투입금액에서 로또 가격을 나눈 개수만큼의 로또를 발급하도록 구현)
  });
});
