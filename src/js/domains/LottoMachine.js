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
export default class LottoMachine {
  #inputMoney = 0;
  #lottos = [];

  get inputMoney() {
    return this.#inputMoney;
  }

  set inputMoney(money) {
    this.#inputMoney = money;
  }

  get lottos() {
    return this.#lottos;
  }

  set lottos(lottos) {
    this.#lottos = lottos;
  }

  operateLottoMachine() {
    this.lottos = this.generateLottos();
    this.inputMoney = 0;
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
