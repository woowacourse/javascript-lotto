const RestartValidator = {
  validate: (input) => {
    if (
      !input ||
      (input.toLowerCase() !== "y" && input.toLowerCase() !== "n")
    ) {
      throw new Error("y 또는 n을 입력해주세요.");
    }
  },
};

export { RestartValidator };
