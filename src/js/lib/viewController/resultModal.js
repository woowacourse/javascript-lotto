import { $ } from '../utils/dom.js';

const updateResultModalView = (winners, profitPercent) => {
  $('#fifth').innerText = `${winners[4]}개`;
  $('#fourth').innerText = `${winners[3]}개`;
  $('#third').innerText = `${winners[2]}개`;
  $('#second').innerText = `${winners[1]}개`;
  $('#first').innerText = `${winners[0]}개`;
  $('#profit').innerText = `당신의 총 수익률은 ${profitPercent}%입니다.`;
};

export { updateResultModalView };
