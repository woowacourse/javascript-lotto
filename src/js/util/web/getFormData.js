const getFormData = (formElement) => {
  const formData = new FormData(formElement);
  const convertedData = {};

  formData.forEach((value, key) => {
    convertedData[key] = value;
  });

  return convertedData;
};

export default getFormData;
