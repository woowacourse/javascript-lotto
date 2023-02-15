import { LOTTO } from '../constants';
import generateRandomNumber from '../generateRandomNumber';

class LottoMachine {
  makeLottoNumbers() {
    const lottoNumbers = [];

    while (lottoNumbers.length < LOTTO.numbersLength) {
      const number = generateRandomNumber(LOTTO.minNumber, LOTTO.maxNumber);
      if (!lottoNumbers.includes(number)) lottoNumbers.push(number);
    }

    return lottoNumbers.sort((a, b) => a - b);
  }

  calculateReward(rankings) {
    const rewardMap = {
      1: 2000000000,
      2: 30000000,
      3: 1500000,
      4: 50000,
      5: 5000,
    };

    return rankings.reduce((acc, ranking) => (acc += rewardMap[ranking]), 0);
  }
}

export default LottoMachine;
