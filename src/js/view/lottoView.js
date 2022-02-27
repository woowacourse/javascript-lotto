import { $$, $ } from '../utils/dom';

const showLottoTicketsLength = (lottoTicketsLength) => {
  const template = `<span>총 ${lottoTicketsLength}개를 구매하였습니다.</span>`;
  $('.purchase-status-container').insertAdjacentHTML('afterbegin', template);
};

const showResultElements = () => {
  $$('.result').forEach((element) => element.classList.remove('d-none'));
};

const showLottoImage = (lottoTickets) => {
  const template = lottoTickets
    .map(
      (lotto) =>
        `<div class="lotto-img">
      🎟️<span class="lotto-number-detail d-none">${lotto.join(', ')}</span>
    </div>`
    )
    .join('');
  $('.lotto-grid').insertAdjacentHTML('beforeend', template);
};

export const toggleNumberDetail = () => {
  const lottoGrid = $('.lotto-grid');

  lottoGrid.classList.toggle('lotto-grid-detail');
  $$('.lotto-number-detail').forEach((element) => {
    element.classList.toggle('d-none');
  });
};

const deactivateForm = () => {
  $('.money-input').setAttribute('disabled', true);
  $('.purchase-button').setAttribute('disabled', true);
};

export const showResult = (lottoTickets) => {
  deactivateForm();
  showResultElements();
  showLottoTicketsLength(lottoTickets.length);
  showLottoImage(lottoTickets);
};
