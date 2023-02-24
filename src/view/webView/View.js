import { $, $$ } from '../../js/dom';

const View = {
  renderLottoCount: (lottoCount) => {
    $('#lotto-count').innerText = lottoCount;
  },

  renderLottoList: (lottos) => {
    const lottoListTemplate = lottos
      .map(
        (lotto) => `<li>
    <span class="ticket-emoji">🎟️</span
    ><span class="lotto-number">${lotto.getLottoNumber().join(', ')}</span>
  </li>`
      )
      .join('');
    $('#lotto-list').innerHTML = lottoListTemplate;
  },

  renderLottoTemplate: () => {
    const lottoListTemplate = document.importNode($('#lotto-list-template').content, true);
    const winningLottoTemplate = document.importNode($('#winning-lotto-template').content, true);

    $('#game-container').appendChild(lottoListTemplate);
    $('#game-container').appendChild(winningLottoTemplate);
  },

  renderRankResult: (winningRankResult, profitRate) => {
    $('#first-rank-count').innerText = winningRankResult[1];
    $('#second-rank-count').innerText = winningRankResult[2];
    $('#third-rank-count').innerText = winningRankResult[3];
    $('#fourth-rank-count').innerText = winningRankResult[4];
    $('#fifth-rank-count').innerText = winningRankResult[5];
    $('#profit-rate').innerText = Number(profitRate.toFixed(1)).toLocaleString();
  },

  getMoneyInput: () => {
    return Number($('#money-input').value);
  },

  getLottoNumberInput: () => {
    const lottoNumber = [...$$('.winning-number')]
      .filter((input) => input.value !== '')
      .map((input) => Number(input.value));

    return lottoNumber;
  },

  getBonusNumberInput: () => {
    return Number($('.bonus-number').value);
  },

  resetMoneyInput: () => {
    $('#money-input').value = '';
  },

  isRenderedTemplate: () => {
    return !!$('#lotto-list');
  },

  resetTemplate: () => {
    $('#lotto-list-container').remove();
    $('#winning-lotto-container').remove();
    $('#result-button').remove();
  },

  showModal: () => {
    $('#modal-background').style.display = 'block';
  },

  closeModal: () => {
    $('#modal-background').style.display = 'none';
  },
};

export default View;
