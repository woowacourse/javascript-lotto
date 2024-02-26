import Console from './Console';

export const retryOnInvalidInput = async func => {
  try {
    return await func();
  } catch (err) {
    Console.print(err.message);
    return await retryOnInvalidInput(func);
  }
};
