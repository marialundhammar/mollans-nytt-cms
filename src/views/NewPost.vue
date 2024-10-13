<template>
  <div class="">
    <h1>Nytt inlägg</h1>

    <!-- Title Input -->
    <label for="title">Title:</label>
    <input id="title" v-model="title" placeholder="Enter title" />

    <!-- Text Area for Long Text -->
    <label for="longText">Text:</label>
    <textarea
      id="longText"
      v-model="longText"
      placeholder="Enter your text"
    ></textarea>

    <!-- Save Button -->
    <button @click="savePost">Spara</button>

    <!-- Preview Section -->
    <div v-if="title || longText">
      <h3>Preview</h3>
      <p><strong>Title:</strong> {{ title }}</p>
      <p><strong>Text:</strong> {{ longText }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Import Firestore functions

export default {
  name: "NewPost",
  setup() {
    const auth = getAuth();
    const db = getFirestore(); // Initialize Firestore
    const user = ref(null);
    const title = ref(""); // Reactive title variable
    const longText = ref(""); // Reactive long text variable

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

    const savePost = async () => {
      if (user.value && title.value && longText.value) {
        try {
          const docRef = await addDoc(collection(db, "posts"), {
            userId: user.value.uid,
            title: title.value,
            text: longText.value,
            createdAt: new Date(),
          });
          console.log("Document written with ID: ", docRef.id);
          alert("Post saved successfully!");
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      } else {
        alert("Please fill in all fields before saving.");
      }
    };

    return {
      user,
      title,
      longText,
      savePost,
    };
  },
};
</script>
