<template>
  <div
    class="container mx-auto mt-10 p-6 bg-white text-gray-800 rounded-md shadow-md max-w-lg"
  >
    <h2 class="text-3xl font-bold text-teal-600 mb-6 text-center">
      Admin Dashboard
    </h2>
    <p
      v-if="successMessage"
      class="mt-4 text-green-600 font-semibold text-center"
    >
      {{ successMessage }}
    </p>
    <p v-if="errorMessage" class="mt-4 text-red-600 font-semibold text-center">
      {{ errorMessage }}
    </p>

    <form @submit.prevent="updateRate" class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Buying Rate</label
        >
        <input
          type="number"
          v-model.number="buyingRate"
          step="0.01"
          required
          class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
          placeholder="Buying Rate"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Selling Rate</label
        >
        <input
          type="number"
          v-model.number="sellingRate"
          step="0.01"
          required
          class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
          placeholder="Selling Rate"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-teal-600 text-white font-bold py-3 rounded-md hover:bg-teal-700 transition duration-300"
      >
        Update Rates
      </button>
    </form>
    <button
      @click="logout"
      class="w-full bg-teal-600 text-white font-bold py-3 rounded-md hover:bg-teal-700 transition duration-300 mt-5"
    >
      Logout
    </button>
  </div>
</template>

<script>
import { db, auth } from "../../firebaseConfig";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default {
  data() {
    return {
      buyingRate: "",
      sellingRate: "",
      successMessage: "",
      errorMessage: "",
    };
  },
  async mounted() {
    await this.fetchRates();
  },
  methods: {
    async fetchRates() {
      try {
        // Fetch the current buying rate
        const buyingRateDoc = await getDoc(
          doc(db, "exchangeRates", "buyingRate")
        );
        if (buyingRateDoc.exists()) {
          this.buyingRate = buyingRateDoc.data().rate;
        }

        // Fetch the current selling rate
        const sellingRateDoc = await getDoc(
          doc(db, "exchangeRates", "sellingRate")
        );
        if (sellingRateDoc.exists()) {
          this.sellingRate = sellingRateDoc.data().rate;
        }
      } catch (error) {
        console.error("Error fetching rates:", error);
        this.errorMessage = "Failed to load current rates. Please try again.";
      }
    },
    async updateRate() {
      try {
        // Save the buying rate to the "buyingRate" document, along with lastUpdated timestamp
        await setDoc(doc(db, "exchangeRates", "buyingRate"), {
          rate: this.buyingRate,
          lastUpdated: serverTimestamp(),
        });

        // Save the selling rate to the "sellingRate" document, along with lastUpdated timestamp
        await setDoc(doc(db, "exchangeRates", "sellingRate"), {
          rate: this.sellingRate,
          lastUpdated: serverTimestamp(),
        });

        // Show success message and reset fields
        this.successMessage = "Rates updated successfully!";
        this.errorMessage = "";
        setTimeout(() => {
          this.successMessage = "";
        }, 3000);
      } catch (error) {
        // Handle error case
        console.error("Error updating rates:", error);
        this.errorMessage = "Failed to update rates. Please try again.";
        this.successMessage = "";
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
