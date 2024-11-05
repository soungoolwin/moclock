<template>
  <nav
    class="bg-teal-600 p-4 bg-gradient-to-r from-blue-500 text-white font-sans shadow-md"
  >
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-2xl font-extrabold text-white">Money O'Clock</div>
      <div class="space-x-4">
        <router-link to="/" class="text-white font-semibold">Home</router-link>
        <router-link to="/about" class="text-white font-semibold"
          >About Us</router-link
        >
      </div>
    </div>
  </nav>
  <div class="bg-teal-500 text-white py-4 text-center font-bold text-xl">
    <div v-if="rates.buyingRate && rates.sellingRate">
      Current Exchange Rate: 1 THB =
      {{ Math.floor(100000 / rates.buyingRate) }} MMK | 1 MMK =
      {{ (rates.sellingRate / 100000).toFixed(4) }} THB
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
          <span class="text-white font-bold">+66 0818186782</span>
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
