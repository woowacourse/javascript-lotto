import { LOTTO } from '../constants';
import Random from '../util/Random';

const generateLottoNumbers = () => {
  const lottoNumbers = new Set();
  while (lottoNumbers.size !== LOTTO.NUMBER_COUNT) {
    lottoNumbers.add(Random.getNumberInRange(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER));
  }
  return [...lottoNumbers];
};

export default generateLottoNumbers;
