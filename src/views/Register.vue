<template>
    <v-card width="600px" class="mx-auto mt-5">
        <v-card-title>
            <h1>Sign Up</h1>
        </v-card-title>

        <v-card-text>
            <v-form @submit.prevent="register" ref="registerForm">
                <v-text-field v-model="firstname"
                required
                v-bind:rules="nameRules"
                label="First Name" prepend-icon="mdi-account-circle"
                />
                <v-text-field v-model="surname"
                required
                v-bind:rules="nameRules"
                label="Surname" prepend-icon="mdi-account-circle"
                />
                <v-text-field v-model="email"
                required
                v-bind:rules="emailRules"
                label="e-mail" prepend-icon="mdi-at"
                />

                <v-text-field v-model="password"
                @click:append="showPassword = !showPassword"
                v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                v-bind:type="showPassword ? 'text' : 'password'"
                label="Password" prepend-icon="mdi-lock" 
                />

                <input type="submit" hidden/>
            </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="register">Register</v-btn>
        </v-card-actions>

    </v-card>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'

export default {
    name: 'Register',
    data() {
        return {
            showPassword: false,
            firstname: '',
            surname: '',
            email: '',
            password: '',
            emailRules: [
                v => !!v || "Required",
                v => /.+@.+/.test(v) || "Please enter a valid e-mail",
            ],
            nameRules: [
                v => !!v || "Required"
            ]
        }
    },
    methods: {
        async register() {
            if(!this.$refs.registerForm.validate()) return;

            FirebaseService.register(this.email, this.password, this.firstname, this.surname).catch(e => {
                this.$emit("open-generic-dialog", ["Error", e.message]);
            });
        }
    }
}
</script>