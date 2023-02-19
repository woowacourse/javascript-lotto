const OutputView = require('../view/OutputView');

const errorCheckFor = async (resolve, reject) => {
  try {
    await resolve();
  } catch (error) {
    OutputView.printErrorMessage(error.message);
    await reject();
  }
};

module.exports = {
  errorCheckFor,
};
