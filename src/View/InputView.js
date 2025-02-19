import { readLineAsync } from '../util/readLineAsync.js';

async function readPrice() {
  return await readLineAsync('> 구입금액을 입력해 주세요. ');
}

async function readWinningNumbers() {
  return await readLineAsync('> 당첨 번호를 입력해 주세요. ');
}

async function readBonusNumbers() {
  return await readLineAsync('> 보너스 번호를 입력해 주세요. ');
}

const InputView = {
  readPrice,
  readWinningNumbers,
  readBonusNumbers,
};

export default InputView;
