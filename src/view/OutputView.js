import MESSAGE from '../constant/message.js';
import Console from '../util/Console.js';

const OutputView = {
  printLottoNumbersList(lottoNumbers) {
    Console.print(`${MESSAGE.BUY_LOTTO(lottoNumbers.length)}`);
    lottoNumbers.forEach(lottoNumber =>
      Console.print(`[${lottoNumber.join(', ')}]`)
    );
    Console.print('');
  },
};

export default OutputView;
