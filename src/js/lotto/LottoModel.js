import { shuffle } from "../utils.js";

export default function LottoModel() {
  this.lottoList = []; // [ { winningNumber: [0, ] } ]

  this.createLotto = () => {
    const baseNumbers = Array.from({ length: 45 }, (_, i) => i + 1);

    shuffle(baseNumbers);

    return {
      winningNumber: baseNumbers.slice(0, 6).sort((a, b) => a - b),
    };
  };

  this.buy = (price) => {
    const numOfLottoes = price / 1000;
    this.lottoList = [...Array(numOfLottoes)].map(() => this.createLotto());
  };
}
