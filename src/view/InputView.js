import { readLine } from '../Utils/Utils';
import OutputView from './OutputView';

const InputView = {
  async readExactValue(config) {
    while (true) {
      const inputString = await readLine.async(config.message);
      try {
        return await config.factory(inputString);
      } catch (e) {
        OutputView.print(e.message);
      }
    }
  },
};

export default InputView;
