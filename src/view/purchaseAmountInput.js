import { keyUpEventListener } from '../utils/eventListener';
import {
  gameTitle,
  purchaseAmountContainer,
} from '../view/templates/purchaseInput';

function addPurchaseEnterEventListener($root, eventHandler) {
  const $container = $root.querySelector('.purchase-amount-container');

  const $purchaseButton = $root.querySelector('#purchase-button');

  $container.addEventListener('keyup', (e) =>
    keyUpEventListener(e, $purchaseButton)
  );
  $purchaseButton.addEventListener('click', eventHandler);
}

function purchaseEnterInput() {
  const $container = document.createElement('div');

  $container.innerHTML = gameTitle + purchaseAmountContainer;

  return $container;
}

export function paintPurchaseAmountInput($root, eventHandler) {
  $root.appendChild(purchaseEnterInput());
  addPurchaseEnterEventListener($root, eventHandler);
}

export function getPurchaseAmount() {
  const $purchaseInput = document.querySelector('#purchase-input');
  const purchaseAmount = Number($purchaseInput.value);

  return purchaseAmount;
}
