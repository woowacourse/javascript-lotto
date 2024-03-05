/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { Input, Output } from './view/console/index';
import LottoGame from './controller/LottoGame';
import { LottoGenerator, StatisticsGenerator, MessageGenerator } from './controller/generator/index';
import retryUntilValid from './utils/retryUntilValid';

const views = {
  mode: 'console',
  input: Input,
  output: Output,
};

const controllers = {
  lotto: LottoGenerator,
  statistics: StatisticsGenerator,
  message: MessageGenerator,
};

const utils = {
  retryUntilValid,
};

const lottoGame = new LottoGame(views, controllers, utils);
lottoGame.start();
