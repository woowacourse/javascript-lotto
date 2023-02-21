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

export default function initialEnterInput() {
  const $container = document.createElement('div');

  $container.innerHTML = gameTitle;
  $container.appendChild(purchaseAmountContainer());

  return $container;
}
