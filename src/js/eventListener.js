import { $, $$ } from './utils/index.js';
import { validator } from './validation/index.js';
import lottoManager from './lottoManager.js';
import view from './view.js';

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

  // TODO: 당첨 개수와 수익률 계산하기

  view.renderWinningStatisticModal();

  $('#winning-statistic-modal-close-button').addEventListener('click', onClickModalCloseButton);

  // TODO: 다시 시작하기 버튼 이벤트 리스너 등록
};

export const onSubmitFareForm = (e) => {
  e.preventDefault();

  try {
    const fare = $('#fare-input').value;

    validator.validateFare(fare);

    const lottoCount = lottoManager.calculateLottoCount(fare);
    const lottoList = lottoManager.createLottos(lottoCount);
    view.renderLottoList(lottoList);

    const remainFare = lottoManager.calculateRemainFare(fare);
    view.renderFare(remainFare);

    view.deactivateFareForm();
    view.renderLottoMatchSection();

    $('#result-button').addEventListener('click', onClickResultButton);
  } catch (error) {
    alert(error.message);
  }
};

export const onToggleLottoViewerController = () =>
  $('#lottos-container').classList.toggle('detail');
