import { retryUntilValidInput } from "../utils/input.js";
import readLottoPriceInput from "../view/input/readLottoPriceInput.js";
import validationLottoPrice from "../validation/validationLottoPrice.js";
import generateLottoNumberSets from "./generateLottoNumberSets.js";
import printLottoNumbers from "../view/output/printLottoNumbers.js";

const purchaseLotto = async () => {
  const lottoPrice = await retryUntilValidInput({
    readUserInput: readLottoPriceInput,
    validator: validationLottoPrice,
  });
  const lottoNumbers = generateLottoNumberSets(lottoPrice);
  printLottoNumbers(lottoNumbers);

  return { lottoPrice, lottoNumbers };
};

export default purchaseLotto;
