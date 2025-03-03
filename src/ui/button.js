import { handleResultCheck } from './modal.js';

// 모달창 닫는 버튼 UI 생성
export function createCloseButton() {
  const closeButton = document.createElement('img');
  closeButton.src = 'https://aydenote.github.io/javascript-lotto/public/img/close.svg';
  closeButton.alt = 'close button';
  closeButton.classList.add('button_close');
  return closeButton;
}

// 다시 시작 버튼 UI 생성
export function createRestartButton() {
  const restartButton = document.createElement('button');
  restartButton.type = 'button';
  restartButton.classList.add('button_restart');
  restartButton.innerText = '다시 시작하기';
  return restartButton;
}

// 결과 확인 버튼 UI 생성
export function createResultButton(lottos) {
  const result_button = document.createElement('button');
  result_button.classList.add('result_button');
  result_button.type = 'button';
  result_button.innerText = '결과 확인하기';
  result_button.addEventListener('click', () => handleResultCheck(lottos));
  main_container.appendChild(result_button);
}
