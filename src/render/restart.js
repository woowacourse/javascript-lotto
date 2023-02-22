import { $ } from '../dom/dom';

const renderRestart = () => {
  $('#winning-statistics').classList.add('hidden');
  $('#purchase-lotto').innerHTML = '';
  $('#winning-lotto-from').innerHTML = '';
  $('#winning-statistics').innerHTML = '';
};

export default renderRestart;
