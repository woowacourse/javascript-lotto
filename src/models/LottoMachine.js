import generateRandomNumber from "../generateRandomNumber";

class LottoMachine {
  makeLottoNumbers() {
    const lottoNumbers = [];

    while (lottoNumbers.length < 6) {
      const number = generateRandomNumber(1, 45);
      if (!lottoNumbers.includes(number)) lottoNumbers.push(number);
    }

    return lottoNumbers;
  }
}

export default LottoMachine;
