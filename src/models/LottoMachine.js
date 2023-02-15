import { LOTTO } from '../constants';
import generateRandomNumber from '../generateRandomNumber';

class LottoMachine {
  makeLottoNumbers() {
    const lottoNumbers = [];

    while (lottoNumbers.length < LOTTO.numbersLength) {
      const number = generateRandomNumber(LOTTO.minNumber, LOTTO.maxNumber);
      if (!lottoNumbers.includes(number)) lottoNumbers.push(number);
    }

    return lottoNumbers;
  }
}

export default LottoMachine;
