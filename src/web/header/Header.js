import './header.css';

export default function Header() {
  const navBar = document.createElement('header');
  const title = document.createElement('h1');

  title.innerText = '🎱행운의 로또';

  navBar.appendChild(title);
  return navBar;
}
