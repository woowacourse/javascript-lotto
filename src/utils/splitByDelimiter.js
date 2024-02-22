const splitByDelimiter = (input, delimiter = ",") => {
  return input.split(delimiter).map((value) => Number(value.trim()));
};

export default splitByDelimiter;
