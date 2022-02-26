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

    const lottoCount = calculateLottoCount(fare);
    const lottoList = lottoGame.createLottos(lottoCount);
    view.renderLottoList(lottoList);

    const remainFare = calculateRemainFare(fare);
    view.renderFare(remainFare);
  } catch (error) {
    alert(error.message);
  }
};

export const onToggleLottoViewerController = () =>
  $('#lottos-container').classList.toggle('detail');
