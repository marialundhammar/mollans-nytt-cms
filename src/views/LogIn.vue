<template>
  <div class="login">
    <h1>Log In</h1>
    <input v-model="email" placeholder="Enter your email" />
    <input
      v-model="password"
      type="password"
      placeholder="Enter your password"
    />
    <button @click="login">Log In</button>
    <button @click="register">Register</button>

    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "vue-router";

export default {
  name: "LoginForm",
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const router = useRouter();

    const login = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        console.log("User logged in:", userCredential.user);
        router.push({ name: "landingpage" });
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    const register = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        console.log("User registered:", userCredential.user);
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    return {
      email,
      password,
      errorMessage,
      login,
      register,
    };
  },
};
</script>
