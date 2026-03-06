// 카운트 만큼 로또 객체를 생성해서 배열로 반환해보자
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

// 예시 buy: (money, generateLottos) => generateLottos(money.getLottoCount())
