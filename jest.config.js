module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  setupFiles: ['jest-plugin-context/setup'],
};
