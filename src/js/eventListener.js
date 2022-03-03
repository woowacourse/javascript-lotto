import { $, $$ } from './utils/index.js';
import { validator } from './validation/index.js';
import lottoManager from './lottoManager.js';
import view from './view.js';

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

  view.renderWinningStatisticModal();
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
