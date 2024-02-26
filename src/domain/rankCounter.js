const rankCounter = {
  incrementCount(count, rank) {
    // 1 ~ 5등까지만 순위 집계 대상이므로 convertToRank에서 rank값을 리턴받은 경우에만 작동한다.
    if (rank) {
      count[rank] += 1;
    }
    return count;
  },

  convertToRank({ normal, bonus }) {
    if (normal === 6) return 1;
    if (normal === 5 && bonus === 1) return 2;
    if (normal === 5) return 3;
    if (normal === 4) return 4;
    if (normal === 3) return 5;
  },

  countRanks(matchingResult) {
    const initialCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    return matchingResult.reduce(
      (count, result) => this.incrementCount(count, this.convertToRank(result)),
      initialCount,
    );
  },
};

export default rankCounter;
