import {
  turnDetailModeOn,
  turnDetailModeOff,
} from '../lib/viewController/ticketList.js';

const detailModeToggleHandler = ({ target }) => {
  if (target.checked) {
    turnDetailModeOn();
  } else {
    turnDetailModeOff();
  }
};

export default detailModeToggleHandler;
