import readLineAsync from "../util/readLineAsync.js";

const InputHandler = async ({ inputMessage, parser, validator }) => {
  try {
    const input = await readLineAsync(inputMessage);
    const parsedInput = parser ? parser(input) : input;
    validator(parsedInput);
    return parsedInput;
  } catch (error) {
    console.log(error.message);
    return InputHandler({ inputMessage, parser, validator });
  }
};

export default InputHandler;
