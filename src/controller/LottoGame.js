import Lotto from '../domain/Lotto';

class LottoGame {
  createLotto(money) {
    return Array.from({ length: money / 1000 }).map(() => new Lotto([1, 2, 3, 4, 5, 6]));
  }
}

export default LottoGame;
