import { LOTTO_RESTART_COMMAND } from "./constants/lotto.js";
import playLotto from "./lotto/playLotto.js";

const app = async () => {
  while (true) {
    const restartCommand = await playLotto();

    if (restartCommand === LOTTO_RESTART_COMMAND.end) {
      break;
    }
  }
};

app();
