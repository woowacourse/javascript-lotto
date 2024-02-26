/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import header from './view/web/header.js';
import main from './view/web/main.js';
import footer from './view/web/footer.js';
import './styles/reset.css';
import './styles/index.css';
import content from './view/web/content.js';

document.querySelector('#app').innerHTML = `
  <header></header>
  <main></main>
  <footer></footer>
`;

header(document.querySelector('header'), '🎱 행운의 로또');
main(document.querySelector('main'));
content(document.querySelector('article'));
footer(document.querySelector('footer'));
