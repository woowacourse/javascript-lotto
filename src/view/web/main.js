import content from './content.js';
import footer from './footer.js';
import EventController from './controller/EventController.js';
import { $ } from './utils/dom.js';
import winningLottoContent from './winningLottoContent.js';

export default function main(element) {
  const eventController = new EventController();

  const render = (element) => {
    element.innerHTML = `
    <article></article>
    `;
  };

  render(element);
  content(document.querySelector('article'));
  winningLottoContent($('#winning-lotto-container'));
  footer(document.querySelector('footer'));
  $('#buy-lotto-form').addEventListener('submit', (event) => eventController.onSubmitBuyForm(event));
  $('#winning-lotto-form').addEventListener('submit', (event) => eventController.handleWinningLottoForm(event));
}
