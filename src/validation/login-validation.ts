import type LoginForm from "@/tools/login-form-property";

export default class LoginValidation {
    form: LoginForm;
    isValid: boolean | undefined

    constructor(form: LoginForm, isValid: boolean | undefined){
        this.form = form;
        this.isValid = isValid
    }
}