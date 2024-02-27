import LottoMachine from '../../domain/lottoMachine.js';
import { validateCost } from '../../utils/validation.js';
import { $, $$ } from './utils/dom.js';
import winningLottoContent from './winningLottoContent.js';

export default function content(element) {
  const onSubmitBuyForm = (event) => {
    event.preventDefault();
    const cost = Number(event.target[0].value);

    try {
      validateCost(cost);
    } catch ({ message }) {
      $('.input-error').innerText = message;
      $('.input-error').style.visibility = 'visible';
      return;
    }

    const lottoMachine = new LottoMachine(cost);
    const lottos = lottoMachine.getLottoNumbers;
    const buyCount = lottoMachine.getLottoCount;

    const lottoQuery = lottos
      .map((numbers) => `<li><span class="ticket-icon">🎟️</span>${numbers.join(', ')}</li>`)
      .join('');

    $('#total-buy-text').innerText = `총 ${buyCount}개를 구매하였습니다.`;
    $('#lotto-tickets-container ul').innerHTML = lottoQuery;
    $('.input-error').style.visibility = 'hidden';
    $('#step2').style.visibility = 'visible';
    $$('.lotto-number')[0].focus();
  };

  const render = (element) => {
    element.innerHTML = `
      <section id="lotto-title"><h1>🎱 내 당첨번호 확인 🎱</h1></section>
      
      <div id="buy-lotto-container">
        <form id="buy-lotto-form">
          <div id="buy-lotto-container">
            <label id="buy-lotto-input-label" for="buy-lotto-input">구입할 금액을 입력해주세요.</label>
            <input id="buy-lotto-input" placeholder="금액" type="text" />
          </div>
          <input id="buy-btn" type="submit" value="구입" />
        </form>
        <span class="input-error"></span>
      </div>

      <div id="step2">
        <span id="total-buy-text"></span>
        <div id="lotto-tickets-container">
          <ul>
          </ul>
        </div>

        <div id="winning-lotto-container"></div>
      </div>
    `;
  };
  render(element);
  winningLottoContent($('#winning-lotto-container'));
  $('#buy-lotto-form').addEventListener('submit', onSubmitBuyForm);
}
