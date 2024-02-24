export default function WinningLotto(LottoNumbers, bonusNumber) {
  return {
    numbers: LottoNumbers.getNumbers(),
    bonusNumber,
    getWinningLotto() {
      return { numbers: this.numbers, bonusNumber: this.bonusNumber };
    },
  };
}
