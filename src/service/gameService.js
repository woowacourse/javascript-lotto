import { YES } from '../constants/constants.js';
import { lottoController } from '../controller/lottoController.js';

export const gameService = {
  reStart(input) {
    if (input === YES) {
      lottoController.run();
    }
  },
};
