import Console from './Console';

export default async function retryOnInvalidInput(func) {
  try {
    return await func();
  } catch (err) {
    Console.print(err.message);
    return retryOnInvalidInput(func);
  }
}
