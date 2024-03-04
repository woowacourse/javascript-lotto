export default function Footer() {
  const footer = document.createElement('footer');
  const span = document.createElement('span');

  span.classList.add('footer-text');
  span.innerText = 'Copyright 2023. woowacourse';

  footer.appendChild(span);

  return footer;
}
