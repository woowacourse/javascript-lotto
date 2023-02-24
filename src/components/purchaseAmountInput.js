import { keyUpEventListener } from '../utils/eventListener';
import {
  gameTitle,
  inputContent,
  inputMessage,
} from '../view/templates/purchaseInput';

function purchaseEnterContainer() {
  const $container = document.createElement('div');

  $container.className = 'purchase-enter-container';
  $container.innerHTML = inputContent;

  return $container;
}

function purchaseAmountContainer() {
  const $container = document.createElement('div');
  $container.className = 'purchase-amount-container';

  $container.innerHTML = inputMessage;

  $container.appendChild(purchaseEnterContainer());

  return $container;
}

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

  $container.innerHTML = gameTitle;
  $container.appendChild(purchaseAmountContainer());

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
