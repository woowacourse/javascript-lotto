import TagGenerators from './TagGenerators.js';
import { $ } from '../utils/dom.js';

const LottoRenderer = {
  renderLottos: lottos => {
    $('#lottos').innerHTML = TagGenerators.generateLottos(lottos);
  },

  renderWinningNumbers: () => {
    $('#winning-numbers').innerHTML = TagGenerators.generateWinningNumberTags();
  },

  renderDialog: () => {
    $('dialog').showModal();
    $('dialog').innerHTML = TagGenerators.generateDialog();
  },

  renderResult: result => {
    $('#result').innerHTML = TagGenerators.generateResult(result);
  },
};

export default LottoRenderer;
