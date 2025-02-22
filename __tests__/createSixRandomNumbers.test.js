import { LOTTO_NUMBER_MAX_LENGTH } from "../src/constants/constant";
import createSixRandomNumbers from "../src/domain/LottoMachine/createSixRandomNumbers";

test("createSixRandomNumbers가 반환하는 배열에는 중복된 숫자가 포함되지 않아야 한다.", () => {
  const numbers = createSixRandomNumbers();
  const uniqueNumbers = new Set(numbers);
  expect(uniqueNumbers.size).toBe(LOTTO_NUMBER_MAX_LENGTH);
});
