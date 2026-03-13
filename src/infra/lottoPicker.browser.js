const { Random } = MissionUtils;
import Lotto from "../domain/Lotto.js";

export const lottoPicker = () => {
  const { MIN_RANGE, MAX_RANGE, SIZE } = Lotto.POLICY;
  return Random.pickUniqueNumbersInRange(MIN_RANGE, MAX_RANGE, SIZE);
};
