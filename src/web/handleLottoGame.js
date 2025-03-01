import Lotto from '../domain/Lotto.js';
import LottoGame from '../domain/LottoGame.js';
import LottoMatch from '../domain/LottoMatch.js';
import validateBonusNumber from '../validations/validate/BonusNumberValidate.js';
import { renderRankTable, renderWinningRate } from '../view/renderLottoResult.js';

const $winningNumbersInput = document.querySelectorAll('.winning-numbers__input');
const $bonusNumber = document.getElementById('bonus-number__input');

export function handleLottoGame(e, state) {
  e.preventDefault();

  calculateRank(state);
  renderRankTable(state);
  renderWinningRate(state);
}

function calculateRank(state) {
  const [winningNumbers, bonusNumber] = getLottoNumbers();
  const lottoMatch = new LottoMatch(winningNumbers, bonusNumber);
  state.lottoGame = new LottoGame();
  state.lottoMaker.lottoList.forEach((lotto) => {
    state.lottoGame.addRankingCount(
      LottoGame.calculateRank(lottoMatch.countMatchingNumbers(lotto), lottoMatch.hasBonusNumber(lotto)),
    );
  });
}

function getLottoNumbers() {
  const numbers = [];
  $winningNumbersInput.forEach((input) => {
    numbers.push(Number(input.value));
  });

  const winningNumbers = new Lotto(numbers);
  const bonusNumber = $bonusNumber.valueAsNumber;
  validateBonusNumber(winningNumbers.numbers, bonusNumber);

  return [winningNumbers, bonusNumber];
}
