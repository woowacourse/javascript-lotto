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

async function readRestart() {
  return await readLineAsync('> 다시 시작하시겠습니까? (y/n) ');
}

const InputView = {
  readPrice,
  readWinningNumbers,
  readBonusNumbers,
  readRestart,
};

export default InputView;
