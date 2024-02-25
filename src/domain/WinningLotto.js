export default function WinningLotto(LottoNumbers, bonusNumber) {
  return {
    numbers: LottoNumbers.getNumbers(),
    bonusNumber,
  };
}
