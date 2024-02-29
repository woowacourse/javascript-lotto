import LottoTickets from './LottoTickets.js';
import WinningLottoContent from './WinningLottoContent.js';

export default function NextSection() {
  const nextSection = document.createElement('section');
  nextSection.setAttribute('id', 'step2');
  nextSection.classList.add('next-section');

  nextSection.appendChild(LottoTickets());
  nextSection.appendChild(WinningLottoContent());

  return nextSection;
}
