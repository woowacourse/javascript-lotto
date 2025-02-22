import { LOTTO_NUMBER_END, LOTTO_NUMBER_START } from "../src/constants/constant";
import generateRandomNumber from "../src/utils/generateRandomNumber";

test("generateRandomNumber는 지정된 범위 내에서 숫자를 생성해야 한다.", () => {
  for (let i = 0; i < 100; i++) {
    const num = generateRandomNumber(LOTTO_NUMBER_START, LOTTO_NUMBER_END);
    expect(num).toBeGreaterThanOrEqual(LOTTO_NUMBER_START);
    expect(num).toBeLessThanOrEqual(LOTTO_NUMBER_END);
  }
});
