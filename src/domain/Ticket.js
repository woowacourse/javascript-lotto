import { LOTTO_NUMBER } from "../constants/lotto.js";
import { getRandomNumber } from "../utils/random.js";
import Lotto from "./Lotto.js";

const Ticket = {
  checkAndAddLottoNumbers: (store, number) => {
    if (store.has(number)) return;
    store.add(number);
  },

  issueLottoNumbers: () => {
    const randomNumberStore = new Set();
    while (randomNumberStore.size < LOTTO_NUMBER.LENGTH) {
      const number = getRandomNumber(LOTTO_NUMBER.MIN, LOTTO_NUMBER.MAX);
      Ticket.checkAndAddLottoNumbers(randomNumberStore, number);
    }
    return [...randomNumberStore];
  },

  createLottos: (count) => {
    return Array.from({ length: count }, () => {
      const lottoNumbers = Ticket.issueLottoNumbers();
      return new Lotto(lottoNumbers);
    });
  },
};

export default Ticket;
