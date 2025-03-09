import WebGameController from './controller/WebGameController.js';
import { $ } from './util/web/selector.js';

document.addEventListener('DOMContentLoaded', () => {
  const WebGameController = new WebGameController();

  // $('#purchase-form').addEventListener('submit', (event) => WebGameController.handlePurchase(event));
  // $('#winning-number-form').addEventListener('submit', (event) => WebGameController.handleWinningSubmit(event));
  // $('#restart-button').addEventListener('click', () => WebGameController.handleRestartGame());
});
