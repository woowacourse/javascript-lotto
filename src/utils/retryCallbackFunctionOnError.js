import { print } from "./console.js";

async function retryCallbackFunctionOnError(func) {
  while (true) {
    try {
      return await func();
    } catch (error) {
      print(error);
    }
  }
}

export default retryCallbackFunctionOnError;
