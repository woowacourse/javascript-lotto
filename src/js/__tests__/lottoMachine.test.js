// - [ ] 로또 기계는 투입금액에서 로또 가격을 나눈 개수만큼의 로또를 발급해야 한다.
// - [ ] 소비자는 금액 투입 시 로또 가격의 배수만을 투입하여야 한다.
import LottoMachine from "../domains/LottoMachine.js";
import { LOTTO } from "../constants/constants.js";

const validInputMoney = "6000";

function isValidInputMoney(money) {
  return money % LOTTO_PRICE === 0;
}

describe("로또 기계 단위 테스트", () => {
  test("로또 기계는 투입금액에서 로또 가격을 나눈 개수만큼의 로또를 발급해야 한다.", () => {
    const lottos = [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6],
    ];
    expect(lottos).toHaveLength(validInputMoney / LOTTO.PRICE);
  });
});
