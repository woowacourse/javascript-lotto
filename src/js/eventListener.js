import { $ } from './utils/index.js';
import { validator } from './validation/index.js';
import { calculateLottoCount, calculateRemainFare } from './domain/index.js';
import lottoGame from './lottoGame.js';
import view from './view.js';

export const onSubmitFareForm = (e) => {
  e.preventDefault();

  try {
    const inputedFare = $('#fare-input').value;

    validator.validateFare(inputedFare);

    view.renderLottoList(lottoGame.createLottos(calculateLottoCount(inputedFare)));
    view.renderFare(calculateRemainFare(inputedFare));
  } catch (error) {
    alert(error.message);
  }
};

export const onChangeLottoViewerController = () =>
  $('#lottos-container').classList.toggle('detail');
