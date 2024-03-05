import OutputView from '../view/OutputView';

async function retryErrorCatch(method) {
  try {
    return await method();
  } catch (error) {
    OutputView.printError(error);
    return retryErrorCatch(method);
  }
}

export default retryErrorCatch;
