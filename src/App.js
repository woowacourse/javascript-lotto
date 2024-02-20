import LottoService from './service/LottoService';

class App {
  #lottoService;

  async run() {
     this.#lottoService = new LottoService();

    await this.#lottoService.start();

  }
}

export default App;