import { LOTTO_NUMBER } from "../constants/lotto.js";
import { getUniqueRandomNumbers } from "../utils/random.js";
import Lotto from "./Lotto.js";

const Ticket = {
  createLottos: (count) => {
    return Array.from({ length: count }, () => {
      const lottoNumbers = getUniqueRandomNumbers(
        { min: LOTTO_NUMBER.MIN, max: LOTTO_NUMBER.MAX },
        LOTTO_NUMBER.LENGTH
      );
      return new Lotto(lottoNumbers);
    });
  },
};

export default Ticket;
