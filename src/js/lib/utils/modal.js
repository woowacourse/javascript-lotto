import { $ } from './dom.js';

const $modal = $('.modal');

const showModal = () => {
  $modal.classList.add('open');
};

const closeModal = () => {
  $modal.classList.remove('open');
};

const updateModalView = (winners, profitPercent) => {
  $('#fifth').innerText = `${winners.fifth}개`;
  $('#fourth').innerText = `${winners.fourth}개`;
  $('#third').innerText = `${winners.third}개`;
  $('#second').innerText = `${winners.second}개`;
  $('#first').innerText = `${winners.first}개`;
  $('#profit').innerText = `당신의 총 수익률은 ${profitPercent}%입니다.`;
};

export { showModal, closeModal, updateModalView };
