import { DOM } from '../../DOM/dom.js';
import { calculateRevenue } from '../../domain/calculateRevenue.js';
import { getWinningMatchCount } from '../../domain/getWinningMatchCount.js';
import WinningLotto from '../../domain/WinningLotto.js';
import { errorHandler } from '../../utils/errorHandler.js';
import { validateBonusNumber, validateWinningNumbers } from '../../validation/validateLottoNumbers.js';
import { LottoGame } from './LottoGame.js';
import { showResultsModal } from './outputHandler.js';
import { disableWinningInputs } from './uiHandler.js';

export const handleResultButtonClick = () => {
  try {
    validateWinningNumbers(LottoGame.winningNumbers);
    validateBonusNumber(LottoGame.winningNumbers)(LottoGame.bonusNumber);

    disableWinningInputs();

    const lottoNumbers = new WinningLotto(LottoGame.winningNumbers, LottoGame.bonusNumber);
    const matchCounts = getWinningMatchCount(LottoGame.lottos, lottoNumbers);
    const revenue = calculateRevenue(matchCounts, LottoGame.purchasePrice);

    showResultsModal(matchCounts, revenue);
  } catch (error) {
    errorHandler(error);
  }
};

export const handleRestartButtonClick = () => {
  location.reload();
};
