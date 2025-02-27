import { createElement } from '../utils/dom';
import { validateWinningNumbers, validateBonusNumber } from '../../validation/validateLottoNumbers';
import { getWinningMatchCount } from '../../domain/getWinningMatchCount';
import { calculateRevenue } from '../../domain/calculateRevenue';
import { ResultDashboard } from '../resultDashboard';

export default function LottoResultModal({ priceInput, playLotto, randomlottos }, { winningNumbers, bonusNumber }) {
  const resultButton = createElement('button', { class: 'result-button', textContent: '결과 확인하기' });

  resultButton.addEventListener('click', () => {
    try {
      validateWinningAndBonusNumbers(winningNumbers, bonusNumber);
      const matchCounts = getWinningMatchCount(randomlottos, {
        winningNumbers,
        bonusNumber: bonusNumber.value,
      });
      const revenue = calculateRevenue(matchCounts, priceInput.value);

      ResultDashboard(playLotto, matchCounts, revenue);
    } catch (error) {
      alert(error.message);
    }
  });
  return resultButton;
}

function validateWinningAndBonusNumbers(winningNumbers, bonusNumber) {
  validateWinningNumbers(winningNumbers.join(','));
  validateBonusNumber(bonusNumber.value, winningNumbers);
}
