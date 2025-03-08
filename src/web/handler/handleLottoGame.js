import Lotto from '../../common/domain/Lotto.js';
import LottoGame from '../../common/domain/LottoGame.js';
import LottoMatch from '../../common/domain/LottoMatch.js';
import validateBonusNumber from '../../common/validations/validate/BonusNumberValidate.js';
import validateLottoNumber from '../../common/validations/validate/LottoNumberValidate.js';
import { renderRankTable, renderWinningRate } from '../view/renderLottoResult.js';
import { openModal } from './handleModal.js';

const $winningNumbersInput = document.querySelectorAll('.winning-numbers__input');
const $bonusNumber = document.getElementById('bonus-number__input');

export async function handleLottoGame(e, state) {
  e.preventDefault();
  const canCalculate = await calculateRank(state);
  if (canCalculate) {
    renderRankTable(state);
    renderWinningRate(state);
    openModal();
  }
}

async function calculateRank(state) {
  const { winningNumbers, bonusNumber } = await getLottoNumbers();
  if (winningNumbers && bonusNumber) {
    const lottoMatch = new LottoMatch(winningNumbers, bonusNumber);
    state.lottoGame = new LottoGame();
    state.lottoMaker.lottoList.forEach((lotto) => {
      state.lottoGame.addRankingCount(
        LottoGame.calculateRank(lottoMatch.countMatchingNumbers(lotto), lottoMatch.hasBonusNumber(lotto)),
      );
    });
    return true;
  }
  return false;
}

async function getLottoNumbers() {
  const numbers = Array.from($winningNumbersInput, (input) => Number(input.value));
  const bonusNumber = $bonusNumber.valueAsNumber;

  try {
    validateLottoNumber(numbers);
    validateBonusNumber(numbers, bonusNumber);
    const winningNumbers = new Lotto(numbers);
    return { winningNumbers, bonusNumber };
  } catch (error) {
    alert(error.message);
    return false;
  }
}
