<<<<<<< HEAD
import { LOTTO } from "../constants/constants.js";
<<<<<<< HEAD
<<<<<<< HEAD
import Lotto from "../domains/Lotto.js";
import validateMoney from "../validations/LottoMachine.js";
export default class LottoMachine {
  #inputMoney = 0;
  #lottos = [];

  get inputMoney() {
    return this.#inputMoney;
  }

  set inputMoney(money) {
    validateMoney(money);
    this.#inputMoney = money;
  }

  get lottos() {
    return this.#lottos;
  }

  get lottoQuantity() {
    return this.#inputMoney / LOTTO.PRICE;
  }

  operateLottoMachine() {
    this.#lottos = this.generateLottos();
    this.#inputMoney = 0;
  }

  generateLottos() {
    return Array(this.lottoQuantity)
      .fill()
      .map(() => {
        const lotto = new Lotto();
        lotto.pickNumbers();
        return lotto;
      });
=======

=======
import Lotto from "../domains/Lotto.js";
>>>>>>> e00c8b0 (feat: 로또 기계가 투입금액에서 로또 가격을 나눈 개수만큼의 로또를 발급하도록 구현)
=======
import { LOTTO } from '../constants/constants.js';
import Lotto from '../domains/Lotto.js';
>>>>>>> a161b95 (feat: 로또 금액을 입력받아 저장하도록 구현)
export default class LottoMachine {
  #inputMoney = 0;
  #lottos = [];

  get inputMoney() {
    return this.#inputMoney;
  }

  set inputMoney(money) {
    this.validateMoney(money);
    this.#inputMoney = money;
  }

  get lottos() {
    return this.#lottos;
  }

  set lottos(lottos) {
    this.#lottos = lottos;
  }

  validateMoney(money) {
    if (!this.isValidUnit(money)) {
      throw new Error(`${LOTTO.PRICE}단위로 입력해주세요`);
    }
    if (!this.isOverZero(money)) {
      throw new Error('0원보다 큰 금액을 입력해주세요.');
    }
  }

  isOverZero(money) {
    return money > 0;
  }

  isValidUnit(money) {
    return money % LOTTO.PRICE === 0;
  }

  operateLottoMachine() {
    this.lottos = this.generateLottos();
    this.#inputMoney = 0;
  }

  generateLottos() {
    return Array(this.calculateLottoQuantity())
      .fill()
      .map(() => {
        const lotto = new Lotto();
        lotto.numbers = lotto.generateNumbers(lotto.generateRandomNumber);
        return lotto;
      });
  }

  calculateLottoQuantity() {
<<<<<<< HEAD
    return this.#inputPrice / LOTTO.PRICE;
>>>>>>> 0d4f4f9 (refactor: 로또 관련 상수 결합)
=======
    return this.#inputMoney / LOTTO.PRICE;
>>>>>>> e00c8b0 (feat: 로또 기계가 투입금액에서 로또 가격을 나눈 개수만큼의 로또를 발급하도록 구현)
  }
}
