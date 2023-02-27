import validator from './domain/validator';
import LottoGame from './domain/LottoGame';

import error from './domHandler/error';
import input from './domHandler/input';
import modal from './domHandler/modal';
import lotto from './domHandler/lotto';

let lottoGame;

export const onSubmitBudgetForm = (event) => {
  event.preventDefault();
  error.clearError('budget');

  const budget = event.target[0].value;

  handleBudget(budget);
};

const handleBudget = (budget) => {
  try {
    validator.validateBudget(budget);
    lottoGame = new LottoGame(budget);
  } catch ({ message }) {
    return error.overwriteError('budget', message);
  }

  renderNextStepAfterBuyingLotto(budget);
};

const renderNextStepAfterBuyingLotto = (budget) => {
  lotto.overwriteLottoCount(budget);
  lotto.overwriteBoughtLottos(lottoGame.getBoughtLottos());

  lotto.nextStepAfterBuyingLottoToVisible();
};

export const onSubmitLottoNumberForm = (event) => {
  event.preventDefault();
  error.clearError('number');

  const winningNumbers = input.getWinningNumberInputsValues();
  const bonusNumber = input.getBonusNumberInputValue();

  handleLottoNumber(winningNumbers, bonusNumber);
};

const handleLottoNumber = (winningNumbers, bonusNumber) => {
  try {
    validator.validateWinningNumber(winningNumbers.join(','));
    validator.validateBonusNumber(bonusNumber);
  } catch ({ message }) {
    return error.overwriteError('number', message);
  }

  renderModal(winningNumbers, bonusNumber);
};

const renderModal = (winningNumbers, bonusNumber) => {
  const winningStatus = lottoGame.getWinningStatus(winningNumbers, bonusNumber).reverse();
  const profitRate = lottoGame.getProfitRate().toFixed(2);

  modal.overWriteWinningCounts(winningStatus);
  modal.overwriteProfitRate(profitRate);

  modal.toVisible();
};

export const onClickModalCloseButton = () => {
  modal.toHidden();
};

export const onClickModalBackground = () => {
  modal.toHidden();
};

export const onClickRetryButton = () => {
  modal.toHidden();
  lotto.nextStepAfterBuyingLottoToHidden();
  input.initInputs();
};
