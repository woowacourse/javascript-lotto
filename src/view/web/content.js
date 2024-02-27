import LottoMachine from '../../domain/lottoMachine.js';
import { validateCost } from '../../utils/validation.js';
import { $ } from './utils/dom.js';

export default function content(element) {
  const onSubmitBuyForm = (event) => {
    event.preventDefault();
    const cost = Number(event.target[0].value);

    try {
      validateCost(cost);
    } catch ({ message }) {
      $('#buy-input-error').innerText = message;
      $('#buy-input-error').style.visibility = 'visible';
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
    $('#buy-input-error').style.visibility = 'hidden';
    $('#step2').style.visibility = 'visible';
  };

  const render = (element) => {
    element.innerHTML = `
      <section id="lotto-title"><h1>🎱 내 당첨번호 확인 🎱</h1></section>
      
      <div>
        <form id="buy-lotto-form">
          <div id="buy-lotto-container">
            <label id="buy-lotto-input-label" for="buy-lotto-input">구입할 금액을 입력해주세요.</label>
            <input id="buy-lotto-input" placeholder="금액" type="text" />
          </div>
          <input id="buy-btn" type="submit" value="구입" />
        </form>
        <span id="buy-input-error"></span>
      </div>

      <div id="step2">
        <span id="total-buy-text"></span>
        <div id="lotto-tickets-container">
          <ul>
          </ul>
        </div>

        <div id="result-container">
          <span id="winning-lotto-title">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</span>
          <form>
            <div id="winning-lotto-input-container">
              <div class="number-input-container">
                <label>당첨 번호</label>
                <div id="winning-numbers-input">
                  <input type="number" class="number-input" />
                  <input type="number" class="number-input" />
                  <input type="number" class="number-input" />
                  <input type="number" class="number-input" />
                  <input type="number" class="number-input" />
                  <input type="number" class="number-input" />
                </div>
              </div>

              <div id="bonus-number-container" class="number-input-container">
                <label>보너스 번호</label>
                <input type="number" id="bonus-number" class="number-input" />
              </div>
            </div>

            <input type="submit" value="결과 확인하기" />
          </form>
        </div>
      </div>
    `;
  };
  render(element);
  $('#buy-lotto-form').addEventListener('submit', onSubmitBuyForm);
}
