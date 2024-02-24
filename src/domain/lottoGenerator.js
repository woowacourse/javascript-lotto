import Lotto from "./Lotto.js";

const lottoGenerator = {
  generateWinningLotto(numbers) {
    return new Lotto(numbers);
  },

  generateRandomLotto(count) {
    return Array.from({ length: count }).map(() => new Lotto());
  },
};

export default lottoGenerator;
