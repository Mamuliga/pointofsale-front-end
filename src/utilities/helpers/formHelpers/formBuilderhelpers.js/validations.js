import { emailRegex } from '../../../constants';

const validateRequiredFields = (field, newActorField, dataFields) => {
  if (field.required) {
    if (newActorField) {
      dataFields.push({
        ...field,
        error: false
      });
    } else {
      dataFields.push({
        ...field,
        error: true,
        helperText: `${field.label} isRequired`
      });
    }
  } else {
    dataFields.push({ ...field, error: false });
  }
};

const validateEmail = (field, emailInput, dataFields) => {
  if (!field.required && !emailInput) {
    dataFields.push({ ...field, error: false });
  } else if (emailRegex.test(emailInput)) {
    dataFields.push({ ...field, error: false });
  } else {
    dataFields.push({
      ...field,
      error: true,
      helperText: `Email is not in valid format`
    });
  }
};

export { validateEmail, validateRequiredFields };
