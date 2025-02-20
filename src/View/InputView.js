import { readLineAsync } from '../util/readLineAsync.js';
import { MESSAGE } from './constants.js';

async function readPrice() {
  return await readLineAsync(`${MESSAGE.READ_PRICE}`);
}

async function readWinningNumbers() {
  return await readLineAsync(`${MESSAGE.READ_WINNING_NUMBERS}`);
}

async function readBonusNumbers() {
  return await readLineAsync(`${MESSAGE.READ_BONUS_NUMBER}`);
}

async function readRestart() {
  return await readLineAsync(`${MESSAGE.READ_RESTART}`);
}

const InputView = {
  readPrice,
  readWinningNumbers,
  readBonusNumbers,
  readRestart,
};

export default InputView;
