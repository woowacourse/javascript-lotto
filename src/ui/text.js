// 당청 통계 제목 UI 생성
export function createModalTitle() {
  const title = document.createElement('h3');
  title.innerText = '🏆 당첨 통계 🏆';
  return title;
}

// 당첨률 안내 UI 생성
export function createRateText() {
  const rateText = document.createElement('p');
  rateText.classList.add('rate_text');
  return rateText;
}

// 입력 안내 UI 생성
export function createInputNotice() {
  const main_container = document.getElementById('main_container');
  const winning_container = document.createElement('section');
  const text_notice = document.createElement('p');

  winning_container.classList.add('winning_container');
  text_notice.innerText = '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.';

  winning_container.appendChild(text_notice);
  main_container.appendChild(winning_container);
}
