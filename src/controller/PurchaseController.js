import SYSTEM_MESSAGE from "../constants/systemMessage.js";
import { getPrice } from "../service/InputService.js";
import { getLottoArray, getLottoCount } from "../service/PurchaseService.js";
import retryOnError from "../util/retryOnError.js";
import OutputView from "../view/OutputView.js";

export const PurchaseController = async () => {
  const price = await retryOnError(getPrice, OutputView.printError);

  const lottoCount = getLottoCount(price);
  OutputView.print(SYSTEM_MESSAGE.COUNT(lottoCount));

  const lottoArray = getLottoArray(lottoCount);
  OutputView.printLottoArray(lottoArray);
  return { lottoArray, lottoCount };
};
