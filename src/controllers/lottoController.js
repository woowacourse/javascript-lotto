import { generateLottoNumbers } from "../domain/generateLottoNumbers.js";
import Lotto from "../models/Lotto.js";
import { getBonusNumber, getWinningNumbers } from "../view/input.js";
import { printLottoCount, printLottoNumbers } from "../view/output.js";

const lottoController = async (price) => {
  const count = price / 1000;
  printLottoCount(count);

  for (let i = 0; i < count; i++) {
    const numbers = generateLottoNumbers();
    new Lotto(numbers);
    printLottoNumbers(numbers);
  }

  const winningNumbers = await getWinningNumbers();
  const bonusNumber = await getBonusNumber(winningNumbers);
};

export default lottoController;
