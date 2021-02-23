import $ from '../lib/utils/dom.js';

const detailModeOn = () => {
  $('#ticket-list').classList.add('detail-mode');
  $('#ticket-list').classList.remove('d-flex');
};

const detailModeOff = () => {
  $('#ticket-list').classList.remove('detail-mode');
  $('#ticket-list').classList.add('d-flex');
};

const detailModeToggleHandler = event => {
  if (event.target.checked) {
    detailModeOn();
  } else {
    detailModeOff();
  }
};

export default detailModeToggleHandler;
