export function getFormData(form, ...fieldNames) {
  const fieldDataMap = {};
  const formData = new FormData(form);

  fieldNames.forEach((name) => {
    const data = formData.getAll(name);
    if (data.length === 0) {
      throw new Error("필수 입력값이 누락되었습니다.");
    }
    fieldDataMap[name] = data;
  });

  return { ...fieldDataMap };
}

export function disableForm(form) {
  const inputs = form.querySelectorAll("input");
  const buttons = form.querySelectorAll("button");

  inputs.forEach((input) => (input.disabled = true));
  buttons.forEach((button) => (button.disabled = true));
}
