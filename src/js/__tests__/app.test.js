import {
  isThousandMultiple,
  isValidMoneyRange,
} from '../controller/validator';
import Lotto from '../model/Lotto';

const getNotDuplicatedSize = numbers => new Set([...numbers]).size;

describe("금액 테스트", () => {
  const MIN_MONEY = 1000;
  const MAX_MONEY = 10000;

  it("입력된 금액은 1000원으로 나누어 떨어져야 한다.", () => {
    expect(isThousandMultiple(1000)).toBe(true);
  });

  it("입력된 금액은 1000원 이상 10000원 이하여야 한다.", () => {
    expect(isValidMoneyRange(9000)).toBe(true);
  });
});

describe('랜덤 숫자 테스트', () => {
  it('랜덤 숫자는 중복되지 않는 6개의 숫자이다', () => {
    const lotto = new Lotto();


    expect(getNotDuplicatedSize(lotto.lottoNumbers)).toBe(6);
  });
});

describe('당첨 번호 입력값 테스트', () => {
  const WINNING_LOTTO_DIGIT = 7;

  it('당첨 번호 입력값은 값이 중복되어서는 안 된다', () => {
    const duplicatedLotto = [3,13,16,36,25,41,41];

    expect(getNotDuplicatedSize(duplicatedLotto) === WINNING_LOTTO_DIGIT).toBe(false);
  });

  it('당첨 번호 입력값에 빈 값이 없어야 한다', () => {
    const emptyLotto = [1,2,3,4,5,6];

    const hasEmptyNumber = (lotto) => lotto.length === WINNING_LOTTO_DIGIT;

    expect(hasEmptyNumber(emptyLotto)).toBe(false);
  });

  it('당첨 번호 입력값은 1 ~ 45 범위의 숫자여야 한다', () => {
    const invalidRangeLotto = [1,2,3,4,5,6,50];

    const isValidLottoRange = (lotto) => lotto.every(number => number >= 1 && number <= 45);

    expect(isValidLottoRange(invalidRangeLotto)).toBe(false);
  });
});

describe('결과 확인 테스트', () => {
  const winningLotto = [4,15,25,36,41,27,33];

  const getHowManyMatched = (winningLotto, lotto) => {
    let matchedCount = 0;

    winningLotto.forEach((winningNumber, index) => {
      if (index === 6) return;
      if (lotto.find(number => number === winningNumber)) {
        matchedCount += 1;
      }
    });

    return matchedCount;
  }

  it('나의 로또와 당첨 로또의 숫자가 몇 개 일치하는지 확인할 수 있다', () => {
    const fourMatchedLotto = [4,15,25,36,42,43];

    expect(getHowManyMatched(winningLotto, fourMatchedLotto)).toBe(4);
  });

  it('2등 당첨을 확인할 수 있다', () => {
    const secondPlaceLotto = [4,15,25,36,41,33];

    const isSeondPlace = (winningLotto, secondPlaceLotto) => {
      if (getHowManyMatched(winningLotto, secondPlaceLotto) === 5
        && secondPlaceLotto.find(number => number === winningLotto[6])) {
          return true;
        }
      return false;
    };

    expect(isSeondPlace(winningLotto, secondPlaceLotto)).toBe(true);
  });
});
