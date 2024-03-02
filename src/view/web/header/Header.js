export default function Header() {
  const header = document.createElement('header');
  const lottoGameTitle = document.createElement('h1');

  lottoGameTitle.classList.add('header-title');
  lottoGameTitle.innerText = '🎱 행운의 로또';

  header.appendChild(lottoGameTitle);

  return header;
}
