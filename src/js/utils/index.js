import {
  $,
  $$,
  toDataAttributeSelector,
  toClassSelector,
} from "./querySelector.js";
import { toNumber } from "./number.js";
import { generateLottoNumbers, readLottoNumber } from "./lotto.js";
import {
  validateCash,
  validateLottoNumber,
  validateLottoNumbersAreUnique,
} from "./validate.js";
import { wrap } from "./proxy.js";
import { notify } from "./notify.js";

export {
  $,
  $$,
  toDataAttributeSelector,
  toClassSelector,
  toNumber,
  generateLottoNumbers,
  readLottoNumber,
  validateCash,
  validateLottoNumber,
  validateLottoNumbersAreUnique,
  wrap,
  notify,
};
