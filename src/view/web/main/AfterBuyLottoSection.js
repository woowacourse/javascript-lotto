import LottoTickets from './LottoTickets.js';
import WinningLottoContent from './WinningLottoContent.js';

export default function AfterBuyLottoSection() {
  const section = document.createElement('section');
  section.classList.add('hidden');
  section.classList.add('full-width');
  section.classList.add('next-section');
  section.setAttribute('id', 'step2');

  section.appendChild(LottoTickets());
  section.appendChild(WinningLottoContent());

  return section;
}
