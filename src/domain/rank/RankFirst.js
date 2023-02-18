import Rank from './Rank.js';

export default class RankFirst extends Rank {
  getPrize() {
    return 2_000_000_000;
  }
}
