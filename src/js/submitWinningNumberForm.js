import Lotto from '../domain/Lotto.js';
import WinningLotto from '../domain/WinningLotto.js';
import { parseBonusNumber, parseWinningNumber } from '../input/parseInput.js';
import { $, $all } from '../util/selector.js';
import validateBonusNumber from '../validation/validateBonusNumber.js';
import validateWinningNumber from '../validation/validateWinningNumber.js';
import { resetError, showError } from './errorHandler.js';
import { lockScroll } from './scroll.js';

// ✅ 2. 당첨 번호 입력 폼 이벤트 설정
export const submitWinningNumberForm = async () => {
  return new Promise((resolve) => {
    $('#winning-number-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const winningLotto = handleWinningNumber();

      resolve(winningLotto);
      // const matchingResult = calculateMatchingResult(winningLotto, lottoArray);
      // const profitRate = calculateProfitRate(matchingResult, lottoArray.length);
    });
  });
};

// 🔹 2. 당첨 번호 입력 처리
const handleWinningNumber = () => {
  const modal = $('#result-modal');
  const errorUI = $('#winning-number-error');
  resetError(errorUI);

  try {
    const { winningNumbers, bonusNumber } = getWinningNumbers();

    const winningLotto = new WinningLotto(new Lotto(winningNumbers), bonusNumber);

    showModal(modal);
    return winningLotto;
  } catch (error) {
    showError(errorUI, error.message);
  }
};

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

// 🔹 3. 모달 관련 함수
const showModal = (modal) => {
  modal.style.display = 'flex';
  lockScroll();
};
