import LottoManager from '../src/Domain/Model/LottoManager.js';
import WinningLotto from '../src/Domain/Model/WinningLotto.js';
import Lotto from '../src/Domain/Model/Lotto.js';
import {
  LOTTO_DEFINITION,
  LOTTO_PRIZE_DEFINITION,
} from '../src/Domain/Constant/Definition.js';
import { makeNotDuplicatedRandomNumbers } from '../src/Utils/math.js';

test('구입 금액에 해당하는 로또 장수를 구한다.', () => {
  const lottoManager = new LottoManager();
  const purchaseMoney = 5000;
  const lottoCount = lottoManager.purchaseLotto(purchaseMoney);
  expect(lottoCount).toBe(5);
});

test('로또 장수에 따라 여러 장 발행한다.', () => {
  const purchaseMoney = 4000;
  const lottoManager = new LottoManager();
  const lottoCount = lottoManager.purchaseLotto(purchaseMoney);
  lottoManager.makeLottoList(lottoCount);
  expect(lottoManager.getLottoList().length).toBe(4);
});

test('로또 1장당 범위내에서 중복되지 않는 랜덤한 번호 6개를 만든다.', () => {
  const lottoNumbers = makeNotDuplicatedRandomNumbers(
    LOTTO_DEFINITION.NUMBER_COUNTS,
    {
      min: LOTTO_DEFINITION.MIN_NUMBER,
      max: LOTTO_DEFINITION.MAX_NUMBER,
    }
  );
  expect(lottoNumbers.length).toBe(LOTTO_DEFINITION.NUMBER_COUNTS);
});

test('당첨 내역을 반환한다.', () => {
  // TODO: 현재는 로또를 로또매니저 내부에서 만들기 때문에 테스트 어려움
  // -> 로또 머신에서 만들고, 만들어진 로또를 로또 매니저한테 인자로 넘기면 이거 테스트 가능
  const lottoList = [
    new Lotto([1, 2, 3, 4, 5, 6]),
    new Lotto([1, 2, 3, 4, 5, 7]),
    new Lotto([1, 2, 3, 4, 5, 8]),
    new Lotto([1, 2, 3, 4, 8, 9]),
    new Lotto([1, 2, 3, 8, 9, 10]),
  ];
  const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);

  const matchingCounts = lottoList.map((lotto) =>
    winningLotto.countMatchingNumbers(lotto)
  );
  const hasBonusNumbers = lottoList.map((lotto) =>
    winningLotto.checkBonusNumber(lotto)
  );

  const result = {
    FIRST_PRIZE: 0,
    SECOND_PRIZE: 0,
    THIRD_PRIZE: 0,
    FOURTH_PRIZE: 0,
    FIFTH_PRIZE: 0,
    NONE: 0,
  };

  const checkCondition = (hasBonusNumber, counts) => {
    if (counts === 6) {
      return LOTTO_PRIZE_DEFINITION.FIRST_PRIZE;
    } else if (counts === 5 && hasBonusNumber) {
      return LOTTO_PRIZE_DEFINITION.SECOND_PRIZE;
    } else if (counts === 5 && !hasBonusNumber) {
      return LOTTO_PRIZE_DEFINITION.THIRD_PRIZE;
    } else if (counts === 4) {
      return LOTTO_PRIZE_DEFINITION.FOURTH_PRIZE;
    } else if (counts === 3) {
      return LOTTO_PRIZE_DEFINITION.FIFTH_PRIZE;
    } else {
      return LOTTO_PRIZE_DEFINITION.NONE;
    }
  };

  matchingCounts.forEach((counts, index) => {
    const hasBonusNumber = hasBonusNumbers[index];
    const lottoResult = checkCondition(hasBonusNumber, counts);
    result[lottoResult] += 1;
  });

  expect(result).toEqual({
    FIRST_PRIZE: 1,
    SECOND_PRIZE: 1,
    THIRD_PRIZE: 1,
    FOURTH_PRIZE: 1,
    FIFTH_PRIZE: 1,
    NONE: 0,
  });
});
