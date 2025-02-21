import './header.css';

export default function Header() {
  const header = document.createElement('header');
  const title = document.createElement('h1');

  title.innerText = '🎱행운의 로또';

  header.appendChild(title);
  return header;
}
