import { MESSAGE } from '../data/Constants';
import IO from '../utils/IO';

const outputLottoInfo = (lottos) => {
  IO.output(lottos.length + MESSAGE.OUTPUT_LOTTO_COUNT);
  lottos.forEach((lotto) => {
    IO.output('[' + lotto.join(', ') + ']');
  });
};

export { outputLottoInfo };
