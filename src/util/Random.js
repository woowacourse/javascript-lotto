const Random = {
  pickNumberInRange(from = 0, to = 0) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  },
};
export default Random;
