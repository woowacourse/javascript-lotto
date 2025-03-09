import WebGameController from './controller/WebGameController.js';
import { $ } from './util/web/selector.js';

document.addEventListener('DOMContentLoaded', () => {
  const webGameController = new WebGameController();

  $('#purchase-form').addEventListener('submit', (event) => webGameController.handlePurchase(event));
  $('#winning-number-form').addEventListener('submit', (event) => webGameController.handleWinningSubmit(event));
  $('#restart-button').addEventListener('click', () => webGameController.handleRestartGame());
});
