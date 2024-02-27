import Lotto from '../../domain/lotto.js';
import WinningLotto from '../../domain/winningLotto.js';
import { $, $$ } from './utils/dom.js';

export default function winningLottoContent(element) {
  const handleWinningLottoForm = (event) => {
    event.preventDefault();
    const winningNumbersInput = $$('.lotto-number');
    const bonusNumber = Number($('.bonus-number').value);
    const winningNumbers = [];

    winningNumbersInput.forEach((element) => winningNumbers.push(Number(element.value)));

    try {
      const winningLotto = new WinningLotto(new Lotto(winningNumbers), bonusNumber);
    } catch ({ message }) {
      $$('.input-error')[1].style.visibility = 'visible';
      $$('.input-error')[1].innerText = message;
      return;
    }

    $$('.input-error')[1].style.visibility = 'hidden';
  };

  const render = (element) => {
    element.innerHTML = `
      <span id="winning-lotto-title">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</span>
      <form id="winning-lotto-form">
        <div id="winning-lotto-input-container">
          <div class="number-input-container">
            <label>당첨 번호</label>
            <div id="winning-numbers-input">
              <input type="number" min="1" max="45" class="number-input lotto-number" />
              <input type="number" min="1" max="45" class="number-input lotto-number" />
              <input type="number" min="1" max="45" class="number-input lotto-number" />
              <input type="number" min="1" max="45" class="number-input lotto-number" />
              <input type="number" min="1" max="45" class="number-input lotto-number" />
              <input type="number" min="1" max="45" class="number-input lotto-number" />
            </div>
          </div>

          <div id="bonus-number-container" class="number-input-container">
            <label>보너스 번호</label>
            <input type="number" class="number-input bonus-number" />
          </div>
        </div>
        <span class="input-error"></span>

        <input type="submit" value="결과 확인하기" />
      </form>
    `;
  };
  render(element);

  $('#winning-lotto-form').addEventListener('submit', handleWinningLottoForm);
}
