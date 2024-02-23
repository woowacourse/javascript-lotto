import console from './console';

async function executeWithRetry(asyncFunc) {
  try {
    return await asyncFunc();
  } catch (error) {
    console.print(error.message);
    return executeWithRetry(asyncFunc);
  }
}

export default executeWithRetry;
