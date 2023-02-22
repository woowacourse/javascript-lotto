import { $ } from '../dom/dom';

const renderRestart = () => {
  $('#purchase-lotto').innerHTML = '';
  $('#winning-lotto-from').innerHTML = '';
  $('#winning-statistics').innerHTML = '';
};

export default renderRestart;
