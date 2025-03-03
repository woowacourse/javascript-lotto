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

export function createWinningNumber() {
  const winning_number_text = document.createElement('p');
  winning_number_text.innerText = '당첨 번호';
  return winning_number_text;
}

export function createBonusNumber() {
  const bonus_number_text = document.createElement('p');
  bonus_number_text.innerText = '보너스 번호';
  return bonus_number_text;
}

// 입력 안내 UI 생성
export function createInputNotice() {
  const main_container = document.getElementById('main_container');
  const winning_container = document.createElement('section');
  const number_text_container = document.createElement('div');
  const text_notice = document.createElement('p');
  const winning_number_text = createWinningNumber();
  const bonus_number_text = createBonusNumber();

  winning_container.classList.add('winning_container');
  number_text_container.classList.add('number_text');
  text_notice.innerText = '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.';

  winning_container.appendChild(text_notice);
  number_text_container.appendChild(winning_number_text);
  number_text_container.appendChild(bonus_number_text);
  main_container.appendChild(winning_container);
  main_container.appendChild(number_text_container);
}
