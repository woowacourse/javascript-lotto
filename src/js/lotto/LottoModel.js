export default function LottoModel() {
  this.lottoList = []; // [ { winningNumber: [0, ], bonusNumber: 0 }, ]

  this.createLottoes = (numOfLottoes) => {
    const baseNumbers = Array.from({ length: 45 }, (_, i) => i + 1);

    this.lottoList = [...Array(numOfLottoes)].map(() => {
      shuffle(baseNumbers);

      return {
        winningNumber: baseNumber.slice(0, 6),
        bonusNumber: baseNumber[6],
      };
    });
  };
}
