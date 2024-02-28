import header from './view/web/header.js';
import main from './view/web/main.js';
import modal from './view/web/modal.js';
import './styles/reset.css';
import './styles/index.css';
import './styles/modal.css';

document.querySelector('#app').innerHTML = `
  <header></header>
  <main></main>
  <footer></footer>
  <div id="modal-container"></div>
`;

header(document.querySelector('header'), '🎱 행운의 로또');
main(document.querySelector('main'));
modal(document.querySelector('#modal-container'));
