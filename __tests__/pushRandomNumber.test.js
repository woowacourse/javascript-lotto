import { LOTTO_NUMBER_MAX_LENGTH } from "../src/constants/constant";
import pushRandomNumbers from "../src/domain/LottoMachine/pushRandomNumbers";

test("pushRandomNumbers는 6개의 숫자로 이루어진 배열을 반환해야한다.", () => {
  const numbers = pushRandomNumbers([]);
  expect(numbers.length).toBe(LOTTO_NUMBER_MAX_LENGTH);
});
