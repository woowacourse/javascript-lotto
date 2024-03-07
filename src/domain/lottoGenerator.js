import { LOTTO, LOTTO_NUMBER } from "../constants/lotto.js";
import Lotto from "./Lotto.js";
import generateRandomNumbers from "../utils/generateRandomNumbers.js";
import WinningLotto from "./WinningLotto.js";
import isHaveEmptyInput from "../utils/isHaveEmptyInput.js";
import CustomError from "../error/CustomError.js";
import ERROR_MESSAGE from "../error/errorMessage.js";

function generateWinningLotto(numbers) {
  const splitNumbers = numbers.split(",");

  if (isHaveEmptyInput(splitNumbers)) throw new CustomError(ERROR_MESSAGE.lottoNumberEmpty);

  const winningLotto = new Lotto(splitNumbers.map(Number));

  return new WinningLotto(winningLotto);
}

function generateRandomLottos(count) {
  return new Array(count).fill().map(() => {
    const randomLotto = generateRandomNumbers(LOTTO_NUMBER.min, LOTTO_NUMBER.max, LOTTO.count);

    return new Lotto(randomLotto);
  });
}

export { generateWinningLotto, generateRandomLottos };
