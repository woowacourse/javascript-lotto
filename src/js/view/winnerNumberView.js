import { CLASSNAMES, SELECTOR } from '../constants/constants';
import { selectDom } from '../utils/utils';

class WinnerNumberView {
  constructor() {
    this.winnerNumberSection = selectDom(SELECTOR.WINNER_NUMBER_SECTION_CLASS);
  }

  render() {
    this.winnerNumberSection.classList.remove(CLASSNAMES.HIDE_CLASSNAME);
  }
}

export default WinnerNumberView;
