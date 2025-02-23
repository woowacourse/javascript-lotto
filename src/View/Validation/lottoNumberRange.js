import { LOTTO_DEFINITION } from '../../Domain/Constant/definition.js';

export const hasWrongLottoNumberRange = (input) => {
  return (
    input < LOTTO_DEFINITION.MIN_NUMBER || input > LOTTO_DEFINITION.MAX_NUMBER
  );
};
