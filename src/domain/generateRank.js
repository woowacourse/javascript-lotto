const generateRankCounter = (prize, count = 0) => ({
  getPrize: () => prize,
  getCount: () => count,
  countOnce: () => ++count,
});

const statistics = {
  first: generateRankCounter(2_000_000_000),
  second: generateRankCounter(30_000_000),
  third: generateRankCounter(1_500_000),
  forth: generateRankCounter(50_000),
  fifth: generateRankCounter(5_000),
};

statistics.first.countOnce();
