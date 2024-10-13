<template>
  <div class="landingPage">
    <h1>Landing</h1>
    <p v-if="user">Inloggad som {{ user.email }}</p>
    <p v-else>Please log in.</p>
    <DashBoard />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DashBoard from "../components/DashBoard.vue";

export default {
  name: "LandingPage",
  components: {
    DashBoard,
  },
  setup() {
    const auth = getAuth();
    const user = ref(null);

    onMounted(() => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (firebaseUser) => {
          if (firebaseUser) {
            user.value = firebaseUser;
          } else {
            user.value = null;
          }
        },
        (error) => {
          console.error("Error during auth state change:", error);
        }
      );

      return () => unsubscribe();
    });

    return {
      user,
    };
  },
};
</script>
