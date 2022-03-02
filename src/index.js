import './css/index.css';
import './css/toggle.css';
import App from './js/app.js';
///////////////
import { $, $$ } from './js/utils/utils.js';
import { SELECTOR } from './js/constants/constants.js';
////////

App();

//////
const getInputWinningNumbers = () => {
  $$(SELECTOR.CLASS.WINNING_NUMBER_INPUT).forEach((item) => console.log(item));
};

getInputWinningNumbers();
