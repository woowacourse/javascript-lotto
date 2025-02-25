import { createElement } from '../utils/dom';
import './header.css';

export default function Header() {
  const header = createElement('header');
  const title = createElement('h1', { textContent: '🎱행운의 로또' });

  header.appendChild(title);
  return header;
}
