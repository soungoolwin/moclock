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
    Current Exchange Rate: 1 THB =
    {{ Math.floor(100000 / rates.buyingRate) }} MMK | 1 MMK =
    {{ (rates.sellingRate / 100000).toFixed(4) }} THB
  </div>

  <router-view @update-rates="updateRates" />

  <!-- Footer -->
  <footer class="bg-teal-600 p-4 mt-10">
    <div class="container mx-auto text-center text-sm">
      <div class="flex justify-center space-x-6 mb-4">
        <a
          href="https://facebook.com"
          target="_blank"
          class="text-white hover:text-teal-300"
        >
          <font-awesome-icon :icon="['fab', 'facebook']" size="2x" />
        </a>
        <a
          href="viber://chat?number=%2B1234567890"
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
        <a href="tel:+1234567890" class="text-white hover:text-teal-300">
          <font-awesome-icon :icon="['fas', 'phone']" size="2x" />
        </a>
      </div>
      &copy; 2024 Currency Exchange. All rights reserved.
    </div>
  </footer>
</template>

<script>
import { ref } from "vue";

export default {
  name: "App",
  setup() {
    const rates = ref({
      buyingRate: 751,
      sellingRate: 760,
    });

    const updateRates = (newRates) => {
      rates.value = newRates;
    };

    return {
      rates,
      updateRates,
    };
  },
};
</script>
