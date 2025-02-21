import DEFINITION, { RANK } from "../constant/Definition.js";
import ERROR from "../constant/Error.js";
import { OUTPUT_MESSAGE } from "../constant/Message.js";

const Output = {
  print(message) {
    console.log(message);
  },
  printLottos(lottos) {
    this.lottoAmount(lottos.length);
    lottos.forEach((lotto) => {
      this.lottoNumbers(lotto.numbers);
    });
    this.newLine();
  },

  lottoAmount(lottoAmount) {
    this.print(OUTPUT_MESSAGE.LOTTO_AMOUNT(lottoAmount));
  },

  lottoNumbers(lottoNumbers) {
    const copyLottoNumbers = [...lottoNumbers];
    copyLottoNumbers.sort((a, b) => a - b);
    this.print(`[${copyLottoNumbers.join(DEFINITION.SPLIT)}]`);
  },

  winningStatistics() {
    this.print(OUTPUT_MESSAGE.WINNING_STATISTICS);
    this.print(OUTPUT_MESSAGE.BOUNDARY);
  },

  newLine() {
    this.print(DEFINITION.EMPTY);
  },

  matchResult(rank, amount) {
    const prize = DEFINITION.LOTTO_PRISE[rank].toLocaleString();
    this.print(OUTPUT_MESSAGE.MATCH_RESULT(rank, amount, prize));
  },

  winningRate(rate) {
    this.print(OUTPUT_MESSAGE.WINNING_RATE(rate));
  },

  printErrorResults(errorResults, errorName) {
    Object.entries(errorResults).forEach(([key, value]) => {
      if (value) this.print(`${ERROR[errorName][key]}`);
    });
  },
};

export default Output;
