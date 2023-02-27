import { createDomWith, $ } from './domUtils.js';

const keyHandler = (event) => {
  if (event.key === 'Escape') {
    $('.modal-background').remove();
    window.removeEventListener('keydown', keyHandler);
  }

  if (event.key === 'Enter') {
    window.location.reload();
  }
};

export const renderResult = ({ first, second, third, fourth, fifth, lottoYield }) => {
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
        <div class="result-item">4개</div>
        <div class="result-item">${fourth.getPrize().toLocaleString('ko-kr')}</div>
        <div class="result-item">${fourth.getCount()}</div>
      </div>
      <div class="result-row">
        <div class="result-item">5개</div>
        <div class="result-item">${third.getPrize().toLocaleString('ko-kr')}</div>
        <div class="result-item">${third.getCount()}</div>
      </div>
      <div class="result-row">
        <div class="result-item">5개+보너스볼</div>
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

  $('.app').appendChild($modalBackground);
  $('.close-button').onclick = () => {
    $('.modal-background').remove();
  };

  window.addEventListener('keydown', keyHandler);
};
