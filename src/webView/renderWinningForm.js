import { createDomWith, appendDomByList, $, all$ } from './domUtils.js';
import { renderResult } from './renderResult.js';

const submitHandler = ($app, lottoGame) => (event) => {
  event.preventDefault();
  try {
    const winningNumbers = Array.from(all$('#winning-numbers>input')).map((elem) =>
      Number(elem.value)
    );
    const bonusNumber = Number($('#bonus-number>input').value);
    const resultBoard = lottoGame.setWinningLotto(winningNumbers, bonusNumber).getGameResult();
    renderResult($app, lottoGame, resultBoard);
  } catch (error) {
    console.dir(error);
  }
};

export const renderWinningForm = ($app, lottoGame) => {
  const $winningSection = createDomWith('section')({ id: 'winning-lotto' });
  $winningSection.innerHTML = `<p class="message">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
  <form action="">
  <div id="number-message" class="message">
    <span>당첨 번호</span>
    <span>보너스 번호</span>
  </div>
  <div id="number-box">
    <div id="winning-numbers">
      <input type="text" minlength="1" maxlength="2" />
      <input type="text" minlength="1" maxlength="2" />
      <input type="text" minlength="1" maxlength="2" />
      <input type="text" minlength="1" maxlength="2" />
      <input type="text" minlength="1" maxlength="2" />
      <input type="text" minlength="1" maxlength="2" />
    </div>
    <div id="bonus-number">
      <input type="text" />
    </div>
  </div>
  <button id="result-button" type="submit">결과 확인하기</button>
  </form>`;
  $('#purchasing-button').disabled = 'disabled';

  $app.appendChild($winningSection);
  $('#winning-numbers>input').focus();
  $('#result-button').addEventListener('click', submitHandler($app, lottoGame));
};
