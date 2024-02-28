import EventController from './controller/EventController.js';
import content from './content.js';
import winningLottoContent from './winningLottoContent.js';
import { $ } from './utils/dom.js';

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
  $('#buy-lotto-form').addEventListener('submit', (event) => eventController.onSubmitBuyForm(event));
  $('#winning-lotto-form').addEventListener('submit', (event) => eventController.handleWinningLottoForm(event));
}
