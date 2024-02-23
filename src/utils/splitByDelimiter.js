const splitByDelimiter = (input, delimiter = ",") => {
  if (typeof input === "string")
    return input.split(delimiter).map((value) => value.trim());
};

export default splitByDelimiter;
