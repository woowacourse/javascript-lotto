import $ from '../utils/dom.js';

const detailModeToggleHandler = event => {
  if (event.target.checked) {
    $('#ticket-list').classList.add('detail-mode');
    $('#ticket-list').classList.remove('d-flex');
  } else {
    $('#ticket-list').classList.remove('detail-mode');
    $('#ticket-list').classList.add('d-flex');
  }
};

export default detailModeToggleHandler;
