import { createElement } from '../utils/dom';
import './footer.css';

export default function Footer() {
  const footer = createElement('footer');
  const text = createElement('span', { textContent: 'Copyright 2025. woowacourse' });

  footer.appendChild(text);
  return footer;
}
