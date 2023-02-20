import { lottoGameSection } from './view/components/lottoGame';

class App {
  #$app;
  #state;

  constructor($app) {
    this.#$app = $app;
  }

  lottoViewSetting = () => {
    this.#$app.appendChild(lottoGameSection());
  };
}

export default App;
