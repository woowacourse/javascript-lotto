import {
  RANDOM_MIN,
  RANDOM_MAX,
  NUMBER_LIST_LENGTH,
} from '../constants/constant.js';

export default class Lotto {
  numbers = [];

  setLottoNumbers = () => {
    while (this.numbers.length === 0) {
      const numberList = this.makeRandomNumberList();
      if (this.isUniqueLottoNumber(numberList)) {
        this.numbers = numberList;
      }
    }
  };

  makeRandomNumberList = () => {
    const randomNumberList = [];
    for (let i = 0; i < NUMBER_LIST_LENGTH; i++) {
      randomNumberList.push(
        Math.floor(Math.random() * (RANDOM_MAX - RANDOM_MIN)) + RANDOM_MIN,
      );
    }
    return randomNumberList;
  };

  isUniqueLottoNumber = lottoNumbers => {
    return lottoNumbers.length === new Set(lottoNumbers).size;
  };
}
