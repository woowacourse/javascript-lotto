import { Random } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

const generateLottos = (count) =>
  Array.from(
    { length: count },
    () =>
      new Lotto(
        Random.pickUniqueNumbersInRange(
          Lotto.MIN_RANGE,
          Lotto.MAX_RANGE,
          Lotto.SIZE,
        ),
      ),
  );

export default generateLottos;
