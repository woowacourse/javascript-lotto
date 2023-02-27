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

    const $gameContainer = $('#game-container');
    $gameContainer.appendChild(lottoListTemplate);
    $gameContainer.appendChild(winningLottoTemplate);
  },

  renderRankResult: (winningRankResult, profitRate) => {
    const $modalContainer = $('#modal-container');
    $modalContainer.querySelector('#first-rank-count').innerText = winningRankResult[1];
    $modalContainer.querySelector('#second-rank-count').innerText = winningRankResult[2];
    $modalContainer.querySelector('#third-rank-count').innerText = winningRankResult[3];
    $modalContainer.querySelector('#fourth-rank-count').innerText = winningRankResult[4];
    $modalContainer.querySelector('#fifth-rank-count').innerText = winningRankResult[5];
    $modalContainer.querySelector('#profit-rate').innerText = Number(
      profitRate.toFixed(1)
    ).toLocaleString();
  },

  isRenderedTemplate: () => {
    return !!$('#lotto-list');
  },

  resetTemplate: () => {
    $('#lotto-list-container').remove();
    $('#winning-lotto-form').remove();
  },

  showModal: () => {
    $('#modal-background').style.display = 'block';
  },
};

export default View;
