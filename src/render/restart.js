import { $ } from '../dom/dom';

const renderRestart = () => {
  const $purcahseAmountButton = $('#purchase-amount-inputs button');
  $purcahseAmountButton.disabled = false;
  $purcahseAmountButton.classList.remove('button-disabled');

  $('#purchase-lotto').innerHTML = '';
  $('#winning-lotto-from').innerHTML = '';
  $('#winning-statistics').innerHTML = '';
};

export default renderRestart;
