import { calculateTotalPrize } from "../../src/domain/calculateTotalPrize.js";
import Lotto from "../../src/domain/Lotto.js";
import { RANKING } from "../../src/constants/constants.js";

const suiLotto = new Lotto([1,2,3,4,5,6]);
const sangchuLotto = new Lotto([6,7,8,9,10,11]);
suiLotto.ranking=RANKING.FIRST.RANK
sangchuLotto.ranking =RANKING.SECOND.RANK
const lottoList=[suiLotto,sangchuLotto]


test('총 상금 계산 테스트', () => {
    expect(calculateTotalPrize(lottoList)).toBe(RANKING.FIRST.PRIZE+RANKING.SECOND.PRIZE);
  });