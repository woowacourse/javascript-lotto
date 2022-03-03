<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { LOTTO } from "../constants/constants.js";
=======
import { LOTTO } from '../constants/constants.js';
>>>>>>> a161b95 (feat: 로또 금액을 입력받아 저장하도록 구현)
=======
import { LOTTO } from '../constants/constants.js';
import LottoResultFactory from './LottoResultFactory.js';
>>>>>>> 47fe7b8 (feat: LottoMachine LottoResult 계산 로직 추가)
export default class Lotto {
  #numbers = [];

  constructor(strategy) {
    this.pickStrategy = strategy;
  }

  get numbers() {
    return this.#numbers;
  }

<<<<<<< HEAD
  #generateRandomNumber() {
    return Math.floor(
      Math.random() * (LOTTO.MAX_NUMBER - LOTTO.MIN_NUMBER) + LOTTO.MIN_NUMBER
=======
const LOTTO_MAX_NUMBER = 45;
const LOTTO_MIN_NUMBER = 1;
const LOTTO_NUMBER_QUANTITY = 6;

=======
import { LOTTO } from "../constants/constants.js";
>>>>>>> 0d4f4f9 (refactor: 로또 관련 상수 결합)
=======
import { LOTTO } from "../constants/constants.js";
>>>>>>> 111f2e8 (refactor: Domain Lotto pickNumbers 로직 간소화)
export default class Lotto {
  #numbers = [];

  get numbers() {
    return this.#numbers;
  }

  pickNumbers(strategy = this.#generateRandomNumber) {
    const set = new Set();
    while (set.size < LOTTO.NUMBER_QUANTITY) {
      set.add(strategy());
    }
    this.#numbers = [...set];
  }

  #generateRandomNumber() {
    return Math.floor(
<<<<<<< HEAD
      Math.random() * (LOTTO_MAX_NUMBER - LOTTO_MIN_NUMBER) + LOTTO_MIN_NUMBER
>>>>>>> f98c3df (feat: 로또 숫자 생성 함수 구현)
=======
      Math.random() * (LOTTO.MAX_NUMBER - LOTTO.MIN_NUMBER) + LOTTO.MIN_NUMBER
>>>>>>> 0d4f4f9 (refactor: 로또 관련 상수 결합)
    );
=======
  generate() {
    this.#numbers = this.pickStrategy.pickNumbers();
    return this;
>>>>>>> 9104408 (refactor: Lotto 생성 과정 전략패턴화)
  }

  generateGrade(winningNumbers, bonusNumber) {
    const numberOfMatches = this.#numbers.filter((number) =>
      winningNumbers.includes(number)
    ).length;

    const hasBonusNumber = this.#numbers.includes(bonusNumber);
    this.result = LottoResultFactory.createLottoResult(
      numberOfMatches,
      hasBonusNumber
    );
  }
}
