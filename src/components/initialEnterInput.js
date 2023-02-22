import { keyUpEventListener } from '../utils/eventListener';
import {
  gameTitle,
  inputContent,
  inputMessage,
} from '../view/templates/initialInput';

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

  const $purchaseButton = $root.querySelector('#purchaseButton');

  $container.addEventListener('keyup', (e) =>
    keyUpEventListener(e, $purchaseButton)
  );
  $purchaseButton.addEventListener('click', eventHandler);
}

function initialEnterInput() {
  const $container = document.createElement('div');

  $container.innerHTML = gameTitle;
  $container.appendChild(purchaseAmountContainer());

  return $container;
}

export default function paintInitialEnterInput($root, eventHandler) {
  $root.appendChild(initialEnterInput());
  addPurchaseEnterEventListener($root, eventHandler);
}
