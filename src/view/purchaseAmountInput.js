import { keyUpEventListener } from '../utils/eventListener';
import {
  gameTitle,
  purchaseAmountContainer,
} from '../view/templates/purchaseInput';

function purchaseEnterInput() {
  const $container = document.createElement('form');

  $container.innerHTML = gameTitle + purchaseAmountContainer;

  return $container;
}

function addPurchaseEnterEventListener($root) {
  const $container = $root.querySelector('.purchase-amount-container');

  const $purchaseButton = $root.querySelector('#purchase-button');

  $container.addEventListener('keyup', (e) =>
    keyUpEventListener(e, $purchaseButton)
  );
}

export function paintPurchaseAmountInput($root, eventHandler) {
  const $board = purchaseEnterInput();
  $root.appendChild($board);

  addPurchaseEnterEventListener($root);

  $board.addEventListener('submit', eventHandler);
}

export function getPurchaseAmount($root) {
  const $purchaseInput = $root.querySelector('#purchase-input');
  const purchaseAmount = Number($purchaseInput.value);

  return purchaseAmount;
}
