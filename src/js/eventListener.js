import { $, $$ } from './utils/index.js';
import { validator } from './validation/index.js';
import lottoManager from './lottoManager.js';
import view from './view.js';
import lottoStatisticMachine from './lottoStatisticMachine.js';

export const onClickModalCloseButton = () => {
  const $winningStatisticModal = $('#winning-statistic-modal');
  $('#app').removeChild($winningStatisticModal);
};

export const onClickResultButton = () => {
  const $matchNumberInputs = $$('.match-number-input');
  const [bonumsNumber, ...winningNumbers] = Array.from($matchNumberInputs)
    .map((inputElement) => inputElement.valueAsNumber)
    .reverse();

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

  view.renderWinningStatisticModal(winningCounts, earningsRate);

  $('#winning-statistic-modal-close-button').addEventListener('click', onClickModalCloseButton);

  // TODO: 다시 시작하기 버튼 이벤트 리스너 등록
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
  view.renderLottoList(lottoList);

  const remainFare = lottoManager.calculateRemainFare(fare);
  view.renderFare(remainFare);

  view.deactivateFareForm();
  view.renderLottoMatchSection();

  $('#result-button').addEventListener('click', onClickResultButton);
};

export const onToggleLottoViewerController = () =>
  $('#lottos-container').classList.toggle('detail');
