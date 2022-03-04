import { $ } from './utils/index.js';
import { validator } from './validation/index.js';
import lottoManager from './lottoManager.js';
import lottoGameView from './views/index.js';
import lottoStatisticMachine from './lottoStatisticMachine.js';

const onClickRestartButton = () => {
  lottoManager.reset();
  lottoStatisticMachine.reset();
  lottoGameView.reset();
};

const onClickResultButton = (winningNumbers, bonumsNumber) => {
  try {
    validator.validateWinningNumbers(winningNumbers);
    validator.validateBonusNumber(winningNumbers, bonumsNumber);
  } catch (error) {
    alert(error.message);
    return;
  }

  const lottos = lottoManager.getLottos();
  const fare = lottoManager.getFare();
  const winningCounts = lottoStatisticMachine.calculateWinningCounts(
    lottos,
    winningNumbers,
    bonumsNumber,
  );

  const earningsRate = lottoStatisticMachine.calculateEarningsRate(fare, winningCounts);

  lottoGameView.renderWinningStatisticModal(winningCounts, earningsRate);
  lottoGameView.bindWinningStatisticModalEvent(onClickRestartButton);
};

export const onSubmitFareForm = (e) => {
  e.preventDefault();
  const fare = $('#fare-input').value;

  try {
    validator.validateFare(fare);
    lottoManager.setFare(fare);
  } catch (error) {
    alert(error.message);
  }

  const lottoCount = lottoManager.calculateLottoCount(fare);
  const lottoList = lottoManager.createLottos(lottoCount);
  const remainFare = lottoManager.calculateRemainFare(fare);

  lottoGameView.renderAfterFareSubmit(lottoList, remainFare);
  lottoGameView.bindLottoMatchViewEvent(onClickResultButton);
};

export const onToggleLottoViewerController = () => {
  $('#lottos-container').classList.toggle('detail');
};
