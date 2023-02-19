import toNumberFormatOfKor from '../utils/toNumberFormatOfKor';

export const LOTTO = {
  price: 1000,
  minNumber: 1,
  maxNumber: 45,
  numbersLength: 6,
};

export const RANKINGS_REWARD = {
  1: 2000000000,
  2: 30000000,
  3: 1500000,
  4: 50000,
  5: 5000,
};

export const RANKING = {
  first: 1,
  second: 2,
};

export const RANKING_STANDARD = {
  first: 6,
  second: 5,
  benchmark: 8,
};

export const RANKING_THRESHOLD = 3;

export const GAME_COMMAND = {
  yes: 'y',
  no: 'n',
};

export const STATISTICS_MESSAGE = {
  5: `3개 일치 (${toNumberFormatOfKor(RANKINGS_REWARD[5])}원)`,
  4: `4개 일치 (${toNumberFormatOfKor(RANKINGS_REWARD[4])}원)`,
  3: `5개 일치 (${toNumberFormatOfKor(RANKINGS_REWARD[3])}원)`,
  2: `5개 일치, 보너스 볼 일치 (${toNumberFormatOfKor(RANKINGS_REWARD[2])}원)`,
  1: `6개 일치 (${toNumberFormatOfKor(RANKINGS_REWARD[1])}원)`,
};

export const MESSAGE = {
  requestPruchaseAmount: '\n> 구입금액을 입력해 주세요.',
  requestWinningNumbers: '\n> 당첨 번호를 입력해 주세요. ',
  requestBonusNumber: '\n> 보너스 번호를 입력해 주세요. ',
  requestGameCommand: '\n> 다시 시작하시겠습니까? (y/n) ',
};
