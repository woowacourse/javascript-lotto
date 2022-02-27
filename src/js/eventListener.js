import { $ } from './utils/index.js';
import { validator } from './validation/index.js';
import { LOTTO_PRICE } from './constant/index.js';
import lottoGame from './lottoGame.js';
import view from './view.js';

export const calculateLottoCount = (fare) => Math.floor(fare / LOTTO_PRICE);

export const calculateRemainFare = (fare) => fare % LOTTO_PRICE;

export const onSubmitFareForm = (e) => {
  e.preventDefault();

  try {
    const inputedFare = $('#fare-input').value;

    validator.validateFare(inputedFare);

    lottoGame.resetLottos();
    lottoGame.createLottos(calculateLottoCount(inputedFare));
    view.renderLottoList(lottoGame.getLottos());
    view.renderFare(calculateRemainFare(inputedFare));
  } catch (error) {
    alert(error.message);
  }
};

export const onChangeLottoViewerController = () =>
  $('#lottos-container').classList.toggle('detail');
