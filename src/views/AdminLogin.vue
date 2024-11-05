<template>
  <div
    class="container mx-auto mt-20 p-8 bg-white text-gray-800 rounded-md shadow-md max-w-md"
  >
    <h2 class="text-3xl font-bold text-teal-600 mb-8 text-center">
      Admin Login
    </h2>
    <button
      @click="loginWithGoogle"
      class="w-full bg-teal-600 text-white font-bold py-3 rounded-md hover:bg-teal-700 transition duration-300 flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mr-2"
        viewBox="0 0 48 48"
      >
        <path
          fill="#4285F4"
          d="M24 9.5c3.9 0 7.1 1.5 9.3 3.9l6.9-6.9C36.1 3.2 30.5.5 24 .5 14.9.5 7.1 6.3 3.5 14.2l8.1 6.3c2.4-5.1 7.5-8.5 13.4-8.5z"
        />
        <path
          fill="#34A853"
          d="M9.9 24c0-1.5.2-3 .6-4.4L3.5 14.2C1.3 18.1 0 21.9 0 24c0 2.1 1.3 5.9 3.5 9.8l7-5.7c-.4-1.4-.6-2.9-.6-4.4z"
        />
        <path
          fill="#FBBC05"
          d="M24 48c4.6 0 8.8-1.5 12-4.1l-7-5.7c-1.4 1.1-3.3 1.8-5 1.8-4.2 0-7.7-2.8-9-6.5l-8.1 6.3c3.5 7.8 11.4 13.2 17.1 13.2z"
        />
        <path
          fill="#EA4335"
          d="M48 24c0-1.6-.2-3.1-.5-4.6H24v9h13.8c-.6 3.2-2.2 5.9-4.6 7.8l7 5.7C45.5 38.7 48 32.7 48 24z"
        />
      </svg>
      Login with Google
    </button>
    <p v-if="errorMessage" class="mt-4 text-red-600 font-semibold text-center">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
import { auth, db } from "../../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

export default {
  name: "AdminLogin",
  data() {
    return {
      errorMessage: "",
    };
  },
  methods: {
    async loginWithGoogle() {
      const provider = new GoogleAuthProvider();

      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        console.log("Logged in user email:", user.email);

        // Query the adminUsers collection for a matching email
        const q = query(
          collection(db, "adminUsers"),
          where("email", "==", user.email)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          this.$router.push("/admin-dashboard");
        } else {
          this.errorMessage = "Unauthorized access";
        }
      } catch (error) {
        this.logout();
        this.errorMessage = "Unauthorized access";
        console.error("Login error:", error);
      }
    },

    async logout() {
      try {
        await signOut(auth);
        this.$router.push("/login");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },
  },
};
</script>
