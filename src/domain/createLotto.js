import Lotto from "../domain/Lotto.js";

const createLotto = (count) => {
  return new Array(count).map(() => new Lotto());
};

export default createLotto;
