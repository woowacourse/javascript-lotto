import LottoGame from '../domain/lottoGame/LottoGame';
import { $, $$ } from './dom';
class App {
  #lottoGame = new LottoGame();

  init() {
    this.bindEventListener();
  }

  handleClickPurchaseButton = () => {
    const $moneyInput = $('#money-input');
    const money = $moneyInput.value;
    try {
      this.#lottoGame.purchaseLottos(money);
      this.showLottoTemplate();
      this.setLottoCount();
      this.showLottoList();
      $('#result-button').addEventListener('click', this.handleClickResultButton);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
    $moneyInput.value = '';
  };

  showLottoList = () => {
    const $lottoList = $('#lotto-list');
    const lottos = this.#lottoGame.getLottos();
    const lottoListTemplate = lottos
      .map(
        (lotto) => `<li>
    <span class="ticket-emoji">🎟️</span
    ><span class="lotto-number">${lotto.getLottoNumber().join(', ')}</span>
  </li>`
      )
      .join('');
    $lottoList.innerHTML = lottoListTemplate;
  };

  setLottoCount() {
    const lottoCount = this.#lottoGame.getLottos().length;
    $('#lotto-count').innerText = lottoCount;
  }

  showLottoTemplate = () => {
    if ($('#lotto-list')) return;

    const $target = $('#game-container');
    const $template = $('#lotto-template');

    const copiedTemplate = document.importNode($template.content, true);

    $target.appendChild(copiedTemplate);
  };

  // showResultButton = () => {
  //   const $gameContainer = $('#game-container');
  //   const $resultButton = $('#result-button');
  //   const resultButtonTemplate = `<button id='result-button' class='my-button'>결과 확인하기</button>`;

  //   if ($resultButton) $resultButton.remove();
  //   $gameContainer.insertAdjacentHTML('beforeend', resultButtonTemplate);
  //   $('#result-button').addEventListener('click', this.handleClickResultButton);
  // };

  handleClickResultButton = () => {
    const lottoNumber = [...$$('.winning-number')]
      .filter((input) => input.value !== '')
      .map((input) => Number(input.value));
    const bonusNumber = Number($('.bonus-number').value);
    try {
      console.log(lottoNumber, bonusNumber);
      this.#lottoGame.generateWinningLotto(lottoNumber, bonusNumber);
      this.renderRankResult();
      this.showModal();
    } catch (error) {
      alert(error);
    }
  };

  handleClickResetButton = () => {
    const $lottoListContainer = $('#lotto-list-container');
    const $winningLottoContainer = $('#winning-lotto-container');
    const $resultButton = $('#result-button');

    $lottoListContainer.remove();
    $winningLottoContainer.remove();
    $resultButton.remove();
    this.closeModal();
  };

  renderRankResult = () => {
    const winningRankResult = this.#lottoGame.getWinningRankResult();
    const profitRate = Number(this.#lottoGame.getProfitRateOfPrize().toFixed(1)).toLocaleString();
    $('#first-rank-count').innerText = winningRankResult[1];
    $('#second-rank-count').innerText = winningRankResult[2];
    $('#third-rank-count').innerText = winningRankResult[3];
    $('#fourth-rank-count').innerText = winningRankResult[4];
    $('#fifth-rank-count').innerText = winningRankResult[5];
    $('#profit-rate').innerText = profitRate;
  };

  showModal = () => {
    $('#modal-background').style.display = 'block';
  };

  closeModal = () => {
    $('#modal-background').style.display = 'none';
  };

  bindEventListener() {
    $('#purchase-button').addEventListener('click', this.handleClickPurchaseButton);

    $('#modal-close-button').addEventListener('click', this.closeModal);

    $('#reset-button').addEventListener('click', this.handleClickResetButton);
  }
}

const app = new App();
app.init();
