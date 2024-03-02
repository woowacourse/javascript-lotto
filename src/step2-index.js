/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import './view/web/css/index.css';
import { Input, Output } from './view/web/index';
import { LottoGenerator, StatisticsGenerator, WebMessageGenerator } from './controller/generator/index';
import LottoGame from './controller/LottoGame';
import retryUntilValidWeb from './utils/retryUntilValidWeb';
import listenModalClose from './utils/modalClose';

const views = {
  mode: 'web',
  input: Input,
  output: Output,
};

const controllers = {
  lotto: LottoGenerator,
  statistics: StatisticsGenerator,
  message: WebMessageGenerator,
};

const utils = {
  retryUntilValid: retryUntilValidWeb,
  listenModalClose,
};

const lottoGame = new LottoGame(views, controllers, utils);
lottoGame.start();
