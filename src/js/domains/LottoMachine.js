<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { LOTTO } from "../constants/constants.js";
<<<<<<< HEAD
<<<<<<< HEAD
import Lotto from "../domains/Lotto.js";
import validateMoney from "../validations/LottoMachine.js";
import LottoStrategy from "./LottoStrategy.js";
=======
import { LOTTO } from '../constants/constants.js';
import Lotto from '../domains/Lotto.js';
import validateMoney from '../validations/LottoMachine.js';
import LottoStrategy from './LottoStrategy.js';
>>>>>>> 47fe7b8 (feat: LottoMachine LottoResult 계산 로직 추가)
export default class LottoMachine {
  #inputMoney;
  #lottos;
  #strategy;

  constructor() {
    this.#inputMoney = 0;
    this.#lottos = [];
    this.#strategy = new LottoStrategy();
  }

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

  updateStrategy(strategy) {
    this.#strategy = strategy;
  }

  operateLottoMachine() {
    this.#lottos = this.generateLottos();
    this.#inputMoney = 0;
  }

  generateLottos() {
    return Array(this.lottoQuantity)
      .fill()
<<<<<<< HEAD
<<<<<<< HEAD
      .map(() => {
        const lotto = new Lotto();
        lotto.pickNumbers();
<<<<<<< HEAD
        return lotto;
      });
=======

=======
import Lotto from "../domains/Lotto.js";
>>>>>>> e00c8b0 (feat: 로또 기계가 투입금액에서 로또 가격을 나눈 개수만큼의 로또를 발급하도록 구현)
=======
import { LOTTO } from '../constants/constants.js';
import Lotto from '../domains/Lotto.js';
<<<<<<< HEAD
>>>>>>> a161b95 (feat: 로또 금액을 입력받아 저장하도록 구현)
=======
import validateMoney from '../validations/LottoMachine.js';
>>>>>>> df9aee0 (refactor: valiate 로직 파일 분리)
=======
import { LOTTO } from "../constants/constants.js";
import Lotto from "../domains/Lotto.js";
import validateMoney from "../validations/LottoMachine.js";
>>>>>>> 91ceeb9 (refactor: set lottos메소드를 제거하여 외부에서 lottos에 대한 직접변경 불가하게 함)
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
        lotto.numbers = lotto.pickNumbers(lotto.generateRandomNumber);
=======
>>>>>>> 111f2e8 (refactor: Domain Lotto pickNumbers 로직 간소화)
        return lotto;
      });
  }
<<<<<<< HEAD

  calculateLottoQuantity() {
<<<<<<< HEAD
    return this.#inputPrice / LOTTO.PRICE;
>>>>>>> 0d4f4f9 (refactor: 로또 관련 상수 결합)
=======
    return this.#inputMoney / LOTTO.PRICE;
>>>>>>> e00c8b0 (feat: 로또 기계가 투입금액에서 로또 가격을 나눈 개수만큼의 로또를 발급하도록 구현)
=======
      .map(() => new Lotto(new LottoStrategy()).generate());
>>>>>>> 9104408 (refactor: Lotto 생성 과정 전략패턴화)
=======
      .map(() => new Lotto(this.#strategy).generate());
  }

  calculateGrade(winningNumbers, bonusNumber) {
    this.#lottos.forEach((lotto) =>
      lotto.generateGrade(winningNumbers, bonusNumber)
    );
>>>>>>> 47fe7b8 (feat: LottoMachine LottoResult 계산 로직 추가)
  }
=======
>>>>>>> 9b14578 (refactor: 메서드 역할 상세화)
}
