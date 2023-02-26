import LottoController from './LottoController';
import InputView from './view/web/InputView';
import OutputView from './view/web/OutputView';

import './view/web';

const lottoController = new LottoController({
  inputView: InputView,
  outputView: OutputView,
});

// DOM에서 LottoController에 접근할 수 있도록 설정
globalThis.lottoController = lottoController;
