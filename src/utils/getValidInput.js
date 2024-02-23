async function getValidInput(readFunction) {
  try {
    return await readFunction();
  } catch (error) {
    console.log(error.message);

    return await getValidInput(readFunction);
  }
}

export default getValidInput;
