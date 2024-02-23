import { LOTTO, LOTTO_NUMBER } from "../constants/lotto.js";
import Lotto from "./Lotto.js";
import generateRandomNumbers from "../utils/generateRandomNumbers.js";
import WinningLotto from "./WinningLotto.js";

function generateWinningLotto(numbers) {
  const parsedNumbers = numbers.split(",").map(Number);
  const winningLotto = new Lotto(parsedNumbers);

  return new WinningLotto(winningLotto);
}

function generateRandomLottos(count) {
  return new Array(count).fill().map(() => {
    const randomLotto = generateRandomNumbers(
      LOTTO_NUMBER.min,
      LOTTO_NUMBER.max,
      LOTTO.count
    );

    return new Lotto(randomLotto);
  });
}

export { generateWinningLotto, generateRandomLottos };
