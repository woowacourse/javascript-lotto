import LottoGame from '../domain/LottoGame.js';
import { createDomWith, appendDomByList, $, all$ } from './domUtils.js';
import { renderLottoList } from './renderLottoList.js';

const lottoGame = new LottoGame();

const renderWinningForm = () => {
  const $winningSection = createDomWith('section')({ id: 'winning-lotto' });

  const $message = createDomWith('p')({
    class: 'message',
    innerText: '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.',
  });

  const $form = document.createElement('form');
  const $spanContainer = createDomWith('div')({ id: 'number-message', class: 'message' });

  const $winningSpan = createDomWith('span')({ innerText: '당첨 번호' });
  const $bonusSpan = createDomWith('span')({ innerText: '보너스 번호' });
  $spanContainer.append($winningSpan, $bonusSpan);

  const $lottoContainer = createDomWith('div')({ id: 'number-box' });
  const $lottoWinningContainer = createDomWith('div')({ id: 'winning-numbers' });

  appendDomByList($lottoWinningContainer)(Array.from({ length: 6 }))((elem) =>
    createDomWith('input')({ type: 'text', minlength: '1', maxlength: '2' })
  );

  const $lottoBonusContainer = createDomWith('div')({ id: 'bonus-number' });

  const $bonusInput = createDomWith('input')({ type: 'text' });
  $lottoBonusContainer.appendChild($bonusInput);

  const $submitButton = createDomWith('button')({
    id: 'result-button',
    type: 'submit',
    innerText: '결과 확인하기',
  });

  $lottoContainer.append($lottoWinningContainer, $lottoBonusContainer);
  $form.append($spanContainer, $lottoContainer, $submitButton);
  $winningSection.append($message, $form);
  $('.app-box').append($winningSection);

  $('#purchasing-button').disabled = 'disabled';

  $submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    try {
      const winningNumbers = Array.from(all$('#winning-numbers>input')).map((elem) =>
        Number(elem.value)
      );
      const bonusNumber = Number($('#bonus-number>input').value);
      const resultBoard = lottoGame.setWinningLotto(winningNumbers, bonusNumber).getGameResult();
      renderResult(resultBoard);
    } catch (error) {
      alert(error);
    }
  });
};

const renderResult = ({ first, second, third, fourth, fifth, lottoYield }) => {
  const $modalBackground = createDomWith('div')({ className: 'modal-background' });

  $modalBackground.innerHTML = `
  <div id="result-modal">
    <section id="result-title">
      🏆 당첨 통계 🏆
      <span class="close-button">X</span>
    </section>
    <section id="result-table">
      <div id="result-head" class="result-row">
        <div class="result-item">일치 갯수</div>
        <div class="result-item">당첨금</div>
        <div class="result-item">당첨 갯수</div>
      </div>
      <div class="result-row">
        <div class="result-item">3개</div>
        <div class="result-item">${fifth.getPrize().toLocaleString('ko-kr')}</div>
        <div class="result-item">${fifth.getCount()}</div>
      </div>
      <div class="result-row">
        <div class="result-item">개</div>
        <div class="result-item">${fourth.getPrize().toLocaleString('ko-kr')}</div>
        <div class="result-item">${fourth.getCount()}</div>
      </div>
      <div class="result-row">
        <div class="result-item">5개+보너스볼</div>
        <div class="result-item">${third.getPrize().toLocaleString('ko-kr')}</div>
        <div class="result-item">${third.getCount()}</div>
      </div>
      <div class="result-row">
        <div class="result-item"></div>
        <div class="result-item">${second.getPrize().toLocaleString('ko-kr')}</div>
        <div class="result-item"> ${second.getCount()}</div>
      </div>
      <div class="result-row">
        <div class="result-item">6개</div>
        <div class="result-item">${first.getPrize().toLocaleString('ko-kr')}</div>
        <div class="result-item">${first.getCount()}</div>
      </div>
      <div id="result-earning">당신의 총 수익률은 ${lottoYield
        .toFixed(1)
        .toLocaleString('ko-kr')}%입니다.</div>
      <form action="" id="retry-form">
        <button id="retry-button" type="submit">다시 시작하기</button>
      </form>
    </section>
  </div>`;

  $('.app-box').appendChild($modalBackground);
  $('.close-button').onclick = () => {
    $('.modal-background').remove();
  };

  window.addEventListener('keydown', function keyHandler(event) {
    if (event.key === 'Escape') {
      $('.modal-background').remove();
      window.removeEventListener('keydown', keyHandler);
    }

    if (event.key === 'Enter') {
      window.location.reload();
    }
  });
};

const purchasingHandler = (event) => {
  event.preventDefault();
  try {
    const money = Number($('#money').value);
    const lottoList = lottoGame.setLottos(money).getLottos();
    renderLottoList(lottoList);
    renderWinningForm();
  } catch (error) {
    alert(error.message);
  }
};

const WebApp = () => {
  const purchasingButton = $('#purchasing-button');
  purchasingButton.addEventListener('click', purchasingHandler);
};

WebApp();
