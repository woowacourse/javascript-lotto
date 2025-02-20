const Output = {
  print(message) {
    console.log(message);
  },

  lottoAmount(lottoAmount) {
    Output.print(`${lottoAmount}개를 구매했습니다.`);
  },

  // 한줄씩 넘기냐 아니면 전체를 넘겨서 출력하냐
  lottoNumbers(lottoNumbers) {
    const copyLottoNumbers = [...lottoNumbers];
    copyLottoNumbers.sort((a, b) => a - b);
    Output.print(`[${copyLottoNumbers.join(", ")}]`);
  },

  winningStatistics() {
    Output.print("당첨 통계");
  },

  boundary() {
    Output.print("--------------------");
  },

  newLine() {
    Output.print("");
  },

  matchResult(matchCount, amount) {
    const prize = DEFINITION.PRIZE[matchCount].toLocaleString();
    Output.print(`${matchCount}개 일치 (${prize}원) - ${amount}개`);
  },

  winningRate(rate) {
    Output.print(`총 수익률은 ${rate}%입니다.`);
  },
};

export default Output;
