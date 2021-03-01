import { $ } from '../utils/dom.js';

const updateResultModalView = (winners, profitPercent) => {
  $('#fifth').innerText = `${winners.fifth}개`;
  $('#fourth').innerText = `${winners.fourth}개`;
  $('#third').innerText = `${winners.third}개`;
  $('#second').innerText = `${winners.second}개`;
  $('#first').innerText = `${winners.first}개`;
  $('#profit').innerText = `당신의 총 수익률은 ${profitPercent}%입니다.`;
};

export { updateResultModalView };
