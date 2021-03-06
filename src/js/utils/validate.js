import {
  NotAnIntegerError,
  OutOfRangeError,
  DuplicatedNumbersError,
} from "../errors/index.js";
import { Lotto } from "../models/index.js";

const validateCash = (cash) => {
  if (!Number.isInteger(cash)) {
    throw new NotAnIntegerError(cash);
  }

  if (cash < Lotto.UNIT_PRICE) {
    throw new OutOfRangeError(null, { min: Lotto.UNIT_PRICE });
  }
};

const validateLottoNumber = (number) => {
  if (!Number.isInteger(number)) {
    throw new NotAnIntegerError(number);
  }

  if (number < Lotto.MIN_NUMBER || number > Lotto.MAX_NUMBER) {
    throw new OutOfRangeError(number, {
      min: Lotto.MIN_NUMBER,
      max: Lotto.MAX_NUMBER,
    });
  }
};

const validateLottoNumbersAreUnique = (...lottoNumbers) => {
  const set = new Set(lottoNumbers);

  if (set.size < lottoNumbers.length) {
    throw new DuplicatedNumbersError([...lottoNumbers].sort((a, b) => a - b));
  }
};

export { validateCash, validateLottoNumber, validateLottoNumbersAreUnique };
