import LottoTickets from './LottoTickets.js';
import WinningLottoContent from './WinningLottoContent.js';

export default function NextSection() {
  const nextSection = document.createElement('section');
  nextSection.classList.add('hidden');
  nextSection.classList.add('full-width');
  nextSection.classList.add('next-section');
  nextSection.setAttribute('id', 'step2');

  nextSection.appendChild(LottoTickets());
  nextSection.appendChild(WinningLottoContent());

  return nextSection;
}
