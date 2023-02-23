import tagGenerators from '../utils/tagGenerators.js';
import { $ } from '../utils/dom.js';

const renderLottos = lottos => {
  $('#lottos').innerHTML = tagGenerators.generateLottos(lottos);
};

const renderWinningNumbers = () => {
  $('#winning-numbers').innerHTML = tagGenerators.generateWinningNumberTags();
};

const renderDialog = () => {
  $('dialog').showModal();
  $('dialog').innerHTML = tagGenerators.generateDialog();
};

const renderResult = result => {
  $('#result').innerHTML = tagGenerators.generateResult(result);
};

export { renderLottos, renderWinningNumbers, renderDialog, renderResult };
