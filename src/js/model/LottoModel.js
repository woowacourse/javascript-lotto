export default class LottoModel {
  constructor() {
    this.lottoCount = 0;
    this.lottos = [];
    this.winningLottoNumbers = {
      winningNumbers: [],
      bonus: 0,
    };
  }

  setLottoCount(value) {
    this.checkValidLottoCount(value);
    this.lottoCount = value / 1000;
  }

  getLottoCount() {
    return this.lottoCount;
  }

  checkValidLottoCount(value) {
    if (!this.isNumber(value)) {
      throw Error('숫자를 입력하세요.');
    }
    if (!this.isOverThousand(value)) {
      throw Error('1000원 이상을 입력해주세요.');
    }
    if (!this.isDividedThousand(value)) {
      throw Error('1000으로 나누어 떨어지는 값을 입력해주세요');
    }
  }

  checkValidWinningNumbers(value) {
    if (this.isOverRangeNumbers(value)) {
      throw Error('1 ~ 45 사이의 숫자를 입력해주세요.');
    }
    if (this.isDuplicateWinningNumbers(value)) {
      throw Error('중복되지 않은 숫자를 입력해주세요.');
    }
  }

  isDividedThousand = (value) => value % 1000 === 0;

  isOverThousand = (value) => value >= 1000;

  isNumber = (value) => value.match(/[0-9]/);

  isDuplicateWinningNumbers = (value) => [...new Set(value)].length !== value.length;

  isOverRangeNumbers = (value) => value.some((elem) => elem > 45 || elem < 1);

  isAllNumber = (value) => value.every((elem) => typeof elem === 'number');

  getRandomNumber = (min, max) => Math.floor(Math.random() * max + min);

  getLottoNumbers() {
    const lottoNumberSet = new Set();
    while (lottoNumberSet.size < 6) {
      lottoNumberSet.add(this.getRandomNumber(1, 45));
    }
    return [...lottoNumberSet];
  }

  setLottos() {
    for (let i = 0; i < this.getLottoCount(); i += 1) {
      this.lottos.push(this.getLottoNumbers());
    }
  }

  getLottos() {
    return this.lottos;
  }

  setWinningLottoNumbers(winnerNumberArray, bonusNumber) {
    this.checkValidWinningNumbers(this.getTotalWinningLottoNumbers(winnerNumberArray, bonusNumber));

    this.winningLottoNumbers.winningNumbers = winnerNumberArray;
    this.winningLottoNumbers.bonus = bonusNumber;
    console.log(this.winningLottoNumbers);
  }

  getTotalWinningLottoNumbers(winnerNumberArray, bonusNumber) {
    return [].concat(winnerNumberArray, bonusNumber);
  }
}
