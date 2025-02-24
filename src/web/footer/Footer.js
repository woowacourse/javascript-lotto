import './footer.css';

export default function Footer() {
  const footer = document.createElement('footer');
  const text = document.createElement('p');

  text.innerText = 'Copyright 2025. woowacourse';

  footer.appendChild(text);
  return footer;
}
