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
      this.showLottoList();
      this.showWinningLottoInput();
      this.showResultButton();
    } catch (error) {
      alert(error.message);
    }
    $moneyInput.value = '';
  };

  showLottoList = () => {
    const $lottoListContainer = $('#lotto-list-container');
    const lottos = this.#lottoGame.getLottos();
    const lottoListTemplate = `<div class="game-message">총 ${
      lottos.length
    }개를 구매하셨습니다.</div>
    <ul id="lotto-list">${lottos
      .map(
        (lotto) => `<li>
    <span class="ticket-emoji">🎟️</span
    ><span class="lotto-number">${lotto.getLottoNumber().join(', ')}</span>
  </li>`
      )
      .join('')}</ul>`;
    $lottoListContainer.innerHTML = lottoListTemplate;
  };

  showWinningLottoInput = () => {
    const $winningLottoContainer = $('#winning-lotto-container');
    const winningLottoInputTemplate = `<div class="game-message">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</div>
    <div id="number-input-container">
      <div id="lotto-number-container" class="number-container">
        <div class="game-message">당첨 번호</div>
        <div id="lotto-number-input-list">
          <input id="first-number" class="lotto-number-input winning-number" type="text" />
          <input id="second-number" class="lotto-number-input winning-number" type="text" />
          <input id="third-number" class="lotto-number-input winning-number" type="text" />
          <input id="fourth-number" class="lotto-number-input winning-number" type="text" />
          <input id="fifth-number" class="lotto-number-input winning-number" type="text" />
          <input id="sixth-number" class="lotto-number-input winning-number" type="text" />
        </div>
      </div>
      <div id="bonus-number-container" class="number-container">
        <div class="game-message">보너스 번호</div>
        <input id="bonus-number" class="lotto-number-input bonus-number" type="text" />
      </div>
    </div>`;
    $winningLottoContainer.innerHTML = winningLottoInputTemplate;
  };

  showResultButton = () => {
    const $gameContainer = $('#game-container');
    const $resultButton = $('#result-button');
    const resultButtonTemplate = `<button id='result-button' class='my-button'>결과 확인하기</button>`;

    if ($resultButton) $resultButton.remove();
    $gameContainer.insertAdjacentHTML('beforeend', resultButtonTemplate);
    $('#result-button').addEventListener('click', this.handleClickResultButton);
  };

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

    $lottoListContainer.textContent = '';
    $winningLottoContainer.textContent = '';
    $resultButton.remove();
    this.closeModal();
  };

  renderRankResult = () => {
    const winningRankResult = this.#lottoGame.getWinningRankResult();
    const profitRate = Number(this.#lottoGame.getProfitRateOfPrize().toFixed(1)).toLocaleString();
    $('#first-rank-count').innerHTML = `${winningRankResult[1]}개`;
    $('#second-rank-count').innerHTML = `${winningRankResult[2]}개`;
    $('#third-rank-count').innerHTML = `${winningRankResult[3]}개`;
    $('#fourth-rank-count').innerHTML = `${winningRankResult[4]}개`;
    $('#fifth-rank-count').innerHTML = `${winningRankResult[5]}개`;
    $('#profit-message').innerHTML = `당신의 총 수익률은 ${profitRate}% 입니다.`;
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
