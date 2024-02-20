import InputView from '../view/InputView';

class LottoService {

  async start() {
    const temp = await InputView.readMoney();
    console.log(temp);
  }
}

export default LottoService;