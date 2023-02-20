const shuffle = (arr) => {
  return arr.sort(() => Math.floor(Math.random() * 3) + -1);
};

module.exports = shuffle;
