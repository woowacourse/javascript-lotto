const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
};

module.exports = { shuffle };
