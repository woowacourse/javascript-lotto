import { print } from "./console.js";

async function catchReturn(func) {
  while (true) {
    try {
      return await func();
    } catch (error) {
      print(error);
    }
  }
}

export default catchReturn;
