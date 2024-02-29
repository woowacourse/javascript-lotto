import Content from './Content.js';

export default function Main() {
  const main = document.createElement('main');

  main.appendChild(Content());

  return main;
}
