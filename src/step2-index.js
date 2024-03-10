import './web/styles/reset.css';
import './web/styles/index.css';
import WebLottoController from './web/WebLottoController';

const app = {
  play() {
    new WebLottoController().run();
  },
};

app.play();
