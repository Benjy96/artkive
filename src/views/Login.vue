<template>
    <v-card width="400px">
        <v-card-title><h1>Login</h1></v-card-title>

        <v-card-text>
            <v-form ref="form" @submit.prevent="login">
                <v-text-field v-model="email"
                required
                v-bind:rules="emailRules"
                label="e-mail" prepend-icon="mdi-account-circle"
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
            <v-btn color="success" @click="login">Login</v-btn>
        </v-card-actions>

    </v-card>
</template>

<script>
// import firebase from 'firebase';

export default {
    name: 'Login',
    data() {
        return {
            showPassword: false,
            email: '',
            password: '',
            emailRules: [
                v => !!v || "Required",
                v => /.+@.+/.test(v) || "Email is invalid",
            ]
        }
    },
    methods: {
        login() {  //event is a MouseEvent - passed in by Javascript
            if(!this.$refs.form.validate()) return;
            
            // let vueInstance = this;
            // firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
            //     vueInstance.$emit("open-generic-dialog", [vueInstance.$getLanguageMsg("Error"), error.message]);
            // });
        }
    }
}
</script>
