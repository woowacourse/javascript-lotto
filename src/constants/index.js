import toNumberFormatOfKor from '../utils/toNumberFormatOfKor';

export const LOTTO = {
  price: 1000,
  minNumber: 1,
  maxNumber: 45,
  numbersLength: 6,
};

export const RANKING = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  fifth: 5,
};

export const RANKINGS_REWARD = {
  [RANKING.first]: 2000000000,
  [RANKING.second]: 30000000,
  [RANKING.third]: 1500000,
  [RANKING.fourth]: 50000,
  [RANKING.fifth]: 5000,
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
  [RANKING.fifth]: `3개 일치 (${toNumberFormatOfKor(RANKINGS_REWARD[5])}원)`,
  [RANKING.fourth]: `4개 일치 (${toNumberFormatOfKor(RANKINGS_REWARD[4])}원)`,
  [RANKING.third]: `5개 일치 (${toNumberFormatOfKor(RANKINGS_REWARD[3])}원)`,
  [RANKING.second]: `5개 일치, 보너스 볼 일치 (${toNumberFormatOfKor(RANKINGS_REWARD[2])}원)`,
  [RANKING.first]: `6개 일치 (${toNumberFormatOfKor(RANKINGS_REWARD[1])}원)`,
};

export const MESSAGE = {
  requestPruchaseAmount: '\n> 구입금액을 입력해 주세요.',
  requestWinningNumbers: '\n> 당첨 번호를 입력해 주세요. ',
  requestBonusNumber: '\n> 보너스 번호를 입력해 주세요. ',
  requestGameCommand: '\n> 다시 시작하시겠습니까? (y/n) ',
};
