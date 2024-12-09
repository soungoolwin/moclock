<template>
  <nav class="bg-teal-600 text-white px-3 pr-5">
    <div class="container mx-auto flex items-center justify-between h-16">
      <!-- Logo Section -->
      <div class="flex items-center">
        <a href="/">
          <img
            src="../public/MOC-02.png"
            alt="Money O'Clock Logo"
            class="h-[150px] w-auto object-contain"
        /></a>
      </div>

      <!-- Navigation Links -->
      <div class="flex space-x-4">
        <router-link to="/" class="text-white font-semibold">Home</router-link>
        <router-link to="/about" class="text-white font-semibold"
          >About Us</router-link
        >
      </div>
    </div>
  </nav>
  <div class="bg-teal-500 text-white py-4 text-center font-bold text-xl">
    <div v-if="rates.buyingRate && rates.sellingRate">
      Buying Exchange Rate: 1 THB =
      {{ (100000 / rates.buyingRate).toFixed(2) }} MMK | Selling Exchange Rate:
      1 THB = {{ (100000 / rates.sellingRate).toFixed(2) }} MMK
    </div>
    <div v-else>Loading exchange rates...</div>
  </div>

  <router-view />

  <!-- Footer -->
  <footer class="bg-teal-600 p-4 mt-10">
    <div class="container mx-auto text-center text-sm">
      <!-- First Row: Social Media Icons -->
      <div class="flex justify-center space-x-6 mb-4">
        <a
          href="https://www.facebook.com/aung.w.phyo.1253236?mibextid=LQQJ4d"
          target="_blank"
          class="text-white hover:text-teal-300"
        >
          <font-awesome-icon :icon="['fab', 'facebook']" size="2x" />
        </a>
        <a
          href="https://invite.viber.com/?g2=AQAv2M9niIfQvVOXJdYZqZpFxCgu2JwvrOtkqR0vcXuMrasOSB2xxI%2Bx9eApQ9Vf&fbclid=IwZXh0bgNhZW0CMTEAAR2MBa9NQLvg8VZIC0HskuM9g3hP4RqVKW1Bv6NFZ1H7pYaIq6l3p9_hruE_aem_8NklqKTt6y2_ohzLql5WGw&lang=en"
          target="_blank"
          class="text-white hover:text-teal-300"
        >
          <font-awesome-icon :icon="['fab', 'viber']" size="2x" />
        </a>
        <a
          href="https://line.me/en/"
          target="_blank"
          class="text-white hover:text-teal-300"
        >
          <font-awesome-icon :icon="['fab', 'line']" size="2x" />
        </a>
      </div>

      <!-- Second Row: Phone Icon and Number -->
      <div class="mb-4">
        <div class="flex items-center justify-center">
          <font-awesome-icon
            :icon="['fas', 'phone']"
            size="2x"
            class="mr-2 text-white"
          />
          <span class="text-white font-bold">+66 818186782</span>
        </div>
      </div>

      <!-- Third Row: Copyright Text -->
      <div>&copy; 2024 Currency Exchange. All rights reserved.</div>
    </div>
  </footer>
</template>

<script>
import { ref, onMounted } from "vue";
import { db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

export default {
  name: "App",
  setup() {
    const rates = ref({
      buyingRate: null,
      sellingRate: null,
    });

    onMounted(() => {
      // Real-time listener for buying rate
      const buyingRateDocRef = doc(db, "exchangeRates", "buyingRate");
      onSnapshot(buyingRateDocRef, (doc) => {
        if (doc.exists()) {
          rates.value.buyingRate = doc.data().rate;
        }
      });

      // Real-time listener for selling rate
      const sellingRateDocRef = doc(db, "exchangeRates", "sellingRate");
      onSnapshot(sellingRateDocRef, (doc) => {
        if (doc.exists()) {
          rates.value.sellingRate = doc.data().rate;
        }
      });
    });

    return {
      rates,
    };
  },
};
</script>
