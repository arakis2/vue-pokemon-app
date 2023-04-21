import type LoginForm from "@/tools/login-form-property";
import LoginValidation from "./login-validation";
import type LoginField from "@/tools/login-field-property";

const validateForm = (form: LoginForm): LoginValidation => {
    let newForm: LoginForm = form;

    // Validator username
    if(form.username.value.length < 3) {
      const errorMsg: string = 'Votre identifiant doit faire au moins 3 caractères de long.';
      const newField: LoginField = { value: form.username.value, error: errorMsg, isValid: false };
      newForm = { ...newForm, ...{ username: newField } };
    } else {
      const newField: LoginField = { value: form.username.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ username: newField } };
    }

    // Validator password
    if(form.password.value.length < 6) {
      const errorMsg: string = 'Votre mot de passe doit faire au moins 6 caractères de long.';
      const newField: LoginField = {value: form.password.value, error: errorMsg, isValid: false};
      newForm = { ...newForm, ...{ password: newField } };
    } else {
      const newField: LoginField = { value: form.password.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ password: newField } };
    }

    return new LoginValidation(newForm, newForm.username.isValid && newForm.password.isValid);
  }

  export default validateForm;