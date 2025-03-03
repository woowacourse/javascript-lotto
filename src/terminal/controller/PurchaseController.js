import { getPrice } from "../service/InputService.js";
import { getLottoArray, getLottoCount } from "../../common/service/PurchaseService.js";
import OutputView from "../view/outputView.js";
import retryOnError from "../../common/util/retryOnError.js";
import SYSTEM_MESSAGE from "../../common/lottoConstants/systemMessage.js";

export const PurchaseController = async () => {
  const price = await retryOnError(getPrice, OutputView.printError);

  const lottoCount = getLottoCount(price);
  OutputView.print(SYSTEM_MESSAGE.COUNT(lottoCount));

  const lottoArray = getLottoArray(lottoCount);
  OutputView.printLottoArray(lottoArray);
  return { lottoArray, lottoCount };
};
