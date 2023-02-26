export const getFormData = target => {
  try {
    const formData = new FormData(target);

    return Object.fromEntries(formData);
  } catch (error) {
    alert(error.message);
  }
};
