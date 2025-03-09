import { $, $all } from '../util/selector.js';
import WinningLotto from '../domain/WinningLotto.js';
import Lotto from '../domain/Lotto.js';
import { parseWinningNumber, parseBonusNumber } from '../input/parseInput.js';
import { calculateMatchingResult } from '../service/MatchingService.js';
import { calculateProfitRate } from '../service/ProfitService.js';
import { showModal } from './util/modal.js';
import { resetError, showError } from './util/errorHandler.js';
import validateBonusNumber from '../validation/validateBonusNumber.js';
import validateWinningNumber from '../validation/validateWinningNumber.js';
import setupModalControl from './setupModalControl.js';
import updateMatchingResult from './view/updateMatchingResult.js';

export const submitWinningNumberForm = (lottoArray) => {
  $('#winning-number-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const winningLotto = handleWinningNumber(lottoArray);

    const matchingResult = calculateMatchingResult(winningLotto, lottoArray);
    const profitRate = calculateProfitRate(matchingResult, lottoArray.length);

    updateMatchingResult(matchingResult, profitRate);
    showModal($('#result-modal'));
    setupModalControl();
  });
};

// 🔹 당첨 번호 입력 및 결과 계산 처리
const handleWinningNumber = () => {
  const errorUI = $('#winning-number-error');
  resetError(errorUI);

  try {
    const { winningNumbers, bonusNumber } = getWinningNumbers();

    // 당첨 번호 객체 생성
    const winningLotto = new WinningLotto(new Lotto(winningNumbers), bonusNumber);
    return winningLotto;
  } catch (error) {
    showError(errorUI, error.message);
  }
};

// 🔹 입력된 당첨 번호 가져오기
const getWinningNumbers = () => {
  const winningNumberInput = Array.from($all('.winning-number-boxes input'))
    .map((input) => input.value.trim())
    .filter((value) => value !== '');

  const bonusNumberInput = $('#bonus').value.trim();

  validateWinningNumber(winningNumberInput);
  const winningNumbers = parseWinningNumber(winningNumberInput);

  validateBonusNumber(winningNumbers, bonusNumberInput);
  const bonusNumber = parseBonusNumber(bonusNumberInput);

  return { winningNumbers, bonusNumber };
};
