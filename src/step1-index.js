import LottoController from './LottoController';
import App from './view/console/App';
import InputView from './view/web/InputView';
import OutputView from './view/web/OutputView';

const lottoController = new LottoController({
  inputView: InputView,
  outputView: OutputView,
});

const app = new App(lottoController);
app.play();
