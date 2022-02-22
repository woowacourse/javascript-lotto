export default class LottoModel {
  getLottoCount(value) {
    this.checkValidLottoCount(value);
    return value / 1000;
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

  isDividedThousand = (value) => value % 1000 === 0;

  isOverThousand = (value) => value >= 1000;

  isNumber = (value) => value.match(/[0-9]/);
}
