import {
  turnDetailModeOn,
  turnDetailModeOff,
} from '../lib/viewController/ticketList.js';

const detailModeToggleHandler = ({ target }) => {
  target.checked ? turnDetailModeOn() : turnDetailModeOff();
};

export default detailModeToggleHandler;
