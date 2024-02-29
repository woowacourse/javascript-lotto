import WinningLottoContent from './WinningLottoContent.js';

export default function NextSection() {
  const section = document.createElement('section');
  section.classList.add('next-section');

  const nextSection = document.createElement('section');
  nextSection.setAttribute('id', 'step2');
  const buyTotalText = document.createElement('span');
  buyTotalText.setAttribute('id', 'total-buy-text');
  const lottoTicketsContainer = document.createElement('section');
  const ul = document.createElement('ul');
  lottoTicketsContainer.setAttribute('id', 'lotto-tickets-container');

  lottoTicketsContainer.appendChild(ul);

  nextSection.appendChild(buyTotalText);
  nextSection.appendChild(lottoTicketsContainer);
  nextSection.appendChild(WinningLottoContent());

  section.appendChild(nextSection);

  return section;
}
