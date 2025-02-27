import { createElement } from '../utils/dom';

export default function ReplayLottoButton(resultDashboard) {
  const replayLottoButton = createElement('button', { class: 'replay-lotto-button', textContent: '다시 구매하기' });
  replayLottoButton.addEventListener('click', () => {
    location.reload();
  });

  resultDashboard.appendChild(replayLottoButton);
}
