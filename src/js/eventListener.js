import { $ } from './utils/index.js';
import { validator } from './validation/index.js';
import { calculateLottoCount, calculateRemainFare } from './domain/index.js';
import lottoGame from './lottoGame.js';
import view from './view.js';

export const onSubmitFareForm = (e) => {
  e.preventDefault();

  try {
    const fare = $('#fare-input').value;

    validator.validateFare(fare);

    view.renderLottoList(lottoGame.createLottos(calculateLottoCount(fare)));
    view.renderFare(calculateRemainFare(fare));
  } catch (error) {
    alert(error.message);
  }
};

export const onChangeLottoViewerController = () =>
  $('#lottos-container').classList.toggle('detail');
