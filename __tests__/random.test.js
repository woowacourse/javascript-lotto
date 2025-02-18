import { getRandomNumber } from "../src/util/random.js";
import LOTTO from "../src/constant/lotto.js";

test(`랜덤으로 생성된 숫자는 ${LOTTO.MIN_RANDOM_VALUE}과 ${LOTTO.MAX_RANDOM_VALUE} 사이여야 한다.`, () => {
    const randomNumber = getRandomNumber();

    expect(randomNumber).toBeGreaterThanOrEqual(LOTTO.MIN_RANDOM_VALUE);
    expect(randomNumber).toBeLessThanOrEqual(LOTTO.MAX_RANDOM_VALUE);
})