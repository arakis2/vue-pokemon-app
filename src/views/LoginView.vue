<script lang="ts">
export default {
    data() {
        return {
            loginForm: { username: { value: '' }, password: { value: '' } } as LoginForm,
            message: 'Vous êtes déconnecté. (pikachu / pikachu)'

        }
    },
    methods: {
        handleInputChange(e: any): void {
            const fieldName: string = e.target.name;
            const fieldValue: string = e.target.value;
            const newField: LoginField = { [fieldName]: { value: fieldValue } };

            this.loginForm = { ...this.loginForm, ...newField };
        },
        handleSubmit(e: any): void {
            e.preventDefault();
            const validationform = validateForm(this.loginForm);

            this.loginForm = validationform.form;

            if (validationform.isValid) {
                this.message = '👉 Tentative de connexion en cours ...';
                AuthenticationService.login(this.loginForm.username.value, this.loginForm.password.value).then(isAuthenticated => {
                    if (!isAuthenticated) {
                        this.message = '🔐 Identifiant ou mot de passe incorrect.';
                        return;
                    }

                    this.$router.push('/pokemons');
                })
            } else {
                this.message = '🔐 Identifiant ou mot de passe incorrect.';
            }
        }
    }
}
</script>
<script setup lang="ts">
import AuthenticationService from '@/services/authentication-service';
import type LoginField from '@/tools/login-field-property';
import type LoginForm from '@/tools/login-form-property';
import validateForm from '@/validation/login-form-validation';


</script>

<template>
    <form @submit="handleSubmit">
        <div className="row">
            <div className="col s12 m8 offset-m2">
                <div className="card hoverable">
                    <div className="card-stacked">
                        <div className="card-content">
                            <!-- message -->
                            <div v-if="message" className="form-group">
                                {{ message }}
                            </div>
                            <!-- username -->
                            <div className="form-group">
                                <label htmlFor="username">Identifiant</label>
                                <input id="username" type="text" name="username" className="form-control" :value="loginForm.username.value" @change="handleInputChange" />
                                <!-- Error -->
                                <div v-if="loginForm.username.error" className="card-panel red accent-1">
                                    {{ loginForm.username.error }}
                                </div>
                            </div>
                            <!-- password -->
                            <div className="form-group">
                                <label htmlFor="password">Mot de passe</label>
                                <input id="password" type="password" name="password" className="form-control" :value="loginForm.password.value" @change="handleInputChange" />
                                <!-- Error -->
                                <div v-if="loginForm.password.error" className="card-panel red accent-1">
                                    {{ loginForm.password.error }}
                                </div>
                            </div>
                        </div>
                        <div className="card-action center">
                            <!-- submit button -->
                            <button type="submit" className="btn">Valider</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>