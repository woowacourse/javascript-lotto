import LottoGame from '../domain/lottoGame/LottoGame';
import { $, $$ } from './dom';
class App {
  #lottoGame;

  init() {
    this.#lottoGame = new LottoGame();
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

  getLottoListTemplate = () => {};

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

  bindEventListener() {
    $('#purchase-button').addEventListener('click', this.handleClickPurchaseButton);
  }

  showWinningLottoInput = () => {
    const $winningLottoContainer = $('#winning-lotto-container');
    const winningLottoInputTemplate = `<div class="game-message">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</div>
    <div id="number-input-container">
      <div id="lotto-number-container" class="number-container">
        <div class="game-message">당첨 번호</div>
        <div id="lotto-number-input-list">
          <input id="first-number" class="lotto-number-input" type="text" />
          <input id="second-number" class="lotto-number-input" type="text" />
          <input id="third-number" class="lotto-number-input" type="text" />
          <input id="fourth-number" class="lotto-number-input" type="text" />
          <input id="fifth-number" class="lotto-number-input" type="text" />
          <input id="sixth-number" class="lotto-number-input" type="text" />
        </div>
      </div>
      <div id="bonus-number-container" class="number-container">
        <div class="game-message">보너스 번호</div>
        <input id="bonus-number" class="lotto-number-input" type="text" />
      </div>
    </div>`;
    $winningLottoContainer.innerHTML = winningLottoInputTemplate;
  };

  showResultButton = () => {
    const $gameContainer = $('#game-container');
    const $resultButton = $('#resultButton');
    const resultButtonTemplate = `<button id='resultButton'>결과 확인하기</button>`;

    if ($resultButton) $resultButton.remove();
    $gameContainer.insertAdjacentHTML('beforeend', resultButtonTemplate);
  };
}

const app = new App();
app.init();
