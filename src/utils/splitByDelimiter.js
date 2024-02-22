const splitByDelimiter = (input, delimiter = ",") => {
  return input.split(delimiter).map((value) => value.trim());
};

export default splitByDelimiter;
