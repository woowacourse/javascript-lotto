import './main.css';

export default function Main() {
  const main = document.createElement('main');
  const text = document.createElement('p');

  text.innerText = '🎱내 번호 당첨 확인🎱';
  main.appendChild(text);

  return main;
}
