import Lotto from './Lotto.js';
import { LOTTO } from '../utils/constants.js';
import { generateRandomNumber, sortNumbers } from '../utils/common.js';

export default class LottoManager {
  constructor(lottos = []) {
    this.lottos = lottos;

    this.listeners = [];
  }

  createLottos(lottoCount) {
    const lottos = Array.from(
      { length: lottoCount },
      () => new Lotto(this.generateLottoNumbers()),
    );

    this.setState({ lottos });
  }

  generateLottoNumbers() {
    const lottoNumbers = new Set();
    while (lottoNumbers.size < LOTTO.LENGTH) {
      lottoNumbers.add(generateRandomNumber(LOTTO.MIN_NUM, LOTTO.MAX_NUM));
    }

    return sortNumbers([...lottoNumbers]);
  }

  static isValidLottoNumbers(numbers) {
    return (
      numbers.length === LOTTO.LENGTH &&
      new Set(numbers).size === numbers.length
    );
  }

  setState({ lottos }) {
    this.lottos = lottos ?? this.lottos;

    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach(listener => listener());
  }
}
