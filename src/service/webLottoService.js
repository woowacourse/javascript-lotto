import { purchaseLotto } from "../domain/purchaseLotto.js";

export const webLottoService = {
    purchaseLotto(purchaseMoney) {
      return purchaseLotto(purchaseMoney);
    },
  };