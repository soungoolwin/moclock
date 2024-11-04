<template>
  <main
    class="container mx-auto mt-10 p-6 bg-white text-gray-800 rounded-md shadow-md max-w-lg"
  >
    <h1 class="text-2xl font-bold text-center text-teal-600 mb-6">
      Currency Calculator
    </h1>
    <div class="space-y-8">
      <div class="flex justify-around">
        <button
          class="px-6 py-2 rounded-md"
          :class="
            isBuying
              ? 'bg-green-700 text-white'
              : 'bg-white text-green-700 border-2 border-green-700'
          "
          @click="toggleMode('buying')"
        >
          BUYING
        </button>
        <button
          class="px-6 py-2 rounded-md"
          :class="
            !isBuying
              ? 'bg-green-700 text-white'
              : 'bg-white text-green-700 border-2 border-green-700'
          "
          @click="toggleMode('selling')"
        >
          SELLING
        </button>
      </div>

      <div class="text-center text-gray-600">
        <p v-if="isBuying">Kyat to Thai Baht</p>
        <p v-else>Thai Baht to Kyat</p>
      </div>
      <hr class="my-4 border-t border-gray-300" />
      <div>
        <div class="space-y-4" v-if="isBuying">
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >How much Kyat do you want to exchange?</label
            >
            <div class="flex items-center mt-1">
              <input
                type="text"
                v-model="formattedKyatAmount"
                @input="handleKyatInput"
                class="flex-grow p-2 border rounded-md focus:ring-teal-500 focus:border-teal-500"
              />
              <span class="ml-2">MMK</span>
            </div>
            <div class="mt-2 text-teal-600 text-center" v-if="kyatAmount">
              = {{ formattedKyatToBahtResult }} THB
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >How much Baht do you want?</label
            >
            <div class="flex items-center mt-1">
              <input
                type="text"
                v-model="formattedBahtAmount"
                @input="handleBahtInput"
                class="flex-grow p-2 border rounded-md focus:ring-teal-500 focus:border-teal-500"
              />
              <span class="ml-2">THB</span>
            </div>
            <div class="mt-2 text-teal-600 text-center" v-if="bahtAmount">
              = {{ formattedKyatNeeded }} MMK
            </div>
          </div>
        </div>
        <div class="space-y-4" v-else>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >How much Baht do you want to exchange?</label
            >
            <div class="flex items-center mt-1">
              <input
                type="text"
                v-model="formattedBahtAmount"
                @input="handleBahtInput"
                class="flex-grow p-2 border rounded-md focus:ring-teal-500 focus:border-teal-500"
              />
              <span class="ml-2">THB</span>
            </div>
            <div class="mt-2 text-teal-600 text-center" v-if="bahtAmount">
              = {{ formattedBahtToKyatResult }} MMK
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >How much Kyat do you want?</label
            >
            <div class="flex items-center mt-1">
              <input
                type="text"
                v-model="formattedKyatAmount"
                @input="handleKyatInput"
                class="flex-grow p-2 border rounded-md focus:ring-teal-500 focus:border-teal-500"
              />
              <span class="ml-2">MMK</span>
            </div>
            <div class="mt-2 text-teal-600 text-center" v-if="kyatAmount">
              = {{ formattedBahtNeeded }} THB
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <!-- Vision Mission Section -->
  <div class="container mx-auto mt-[80px] mb-[60px] flex justify-center">
    <hr class="w-1/2 border-t-4 border-teal-500" />
  </div>
  <div class="flex flex-wrap items-center mx-[50px]">
    <div class="w-full md:w-1/2 p-4">
      <h2 class="text-3xl font-bold text-teal-600 mb-6">Our Vision</h2>
      <p class="mb-4 text-lg">
        To be the leading provider of reliable and user-friendly currency
        exchange services, making international financial transactions simple
        and accessible for everyone.
      </p>
    </div>
    <div class="w-full md:w-1/2 p-4">
      <h2 class="text-3xl font-bold text-teal-600 mb-6">Our Mission</h2>
      <p class="mb-4 text-lg">
        Our mission is to empower our customers by offering accurate, real-time
        currency exchange rates and exceptional customer service, ensuring a
        seamless experience for all their currency conversion needs.
      </p>
    </div>
  </div>
</template>

<script>
import { ref, computed, defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  emits: ["update-rates"],
  setup(props, { emit }) {
    const isBuying = ref(true);
    const kyatAmount = ref(0);
    const bahtAmount = ref(0);
    const kyatToBahtResult = ref(0);
    const kyatNeeded = ref(0);
    const bahtToKyatResult = ref(0);
    const bahtNeeded = ref(0);
    const buyingRate = ref(800);
    const sellingRate = ref(810);

    const formatNumber = (value) => {
      return Number(value).toLocaleString();
    };

    emit("update-rates", {
      buyingRate: buyingRate.value,
      sellingRate: sellingRate.value,
    });

    const toggleMode = (mode) => {
      isBuying.value = mode === "buying";
      resetFields();
    };

    const handleKyatInput = (event) => {
      const input = event.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      kyatAmount.value = Number(input);
      event.target.value = formatNumber(input); // Update input field with formatted value
      if (isBuying.value) {
        calculateKyatToBaht();
      } else {
        calculateKyatFromBaht();
      }
    };

    const handleBahtInput = (event) => {
      const input = event.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      bahtAmount.value = Number(input);
      event.target.value = formatNumber(input); // Update input field with formatted value
      if (isBuying.value) {
        calculateBahtFromKyat();
      } else {
        calculateBahtToKyat();
      }
    };

    const calculateKyatToBaht = () => {
      kyatToBahtResult.value = Math.round(
        (kyatAmount.value / 100000) * buyingRate.value
      );
      bahtAmount.value = 0;
    };

    const calculateBahtFromKyat = () => {
      kyatNeeded.value = Math.round(
        (bahtAmount.value * 100000) / buyingRate.value
      );
      kyatAmount.value = 0;
    };

    const calculateBahtToKyat = () => {
      bahtToKyatResult.value = Math.round(
        (bahtAmount.value / sellingRate.value) * 100000
      );
      kyatAmount.value = 0;
    };

    const calculateKyatFromBaht = () => {
      bahtNeeded.value = Math.round(
        (kyatAmount.value / 100000) * sellingRate.value
      );
      bahtAmount.value = 0;
    };

    const resetFields = () => {
      kyatAmount.value = 0;
      bahtAmount.value = 0;
      kyatToBahtResult.value = 0;
      kyatNeeded.value = 0;
      bahtToKyatResult.value = 0;
      bahtNeeded.value = 0;
    };

    const formattedKyatAmount = computed(() => formatNumber(kyatAmount.value));
    const formattedBahtAmount = computed(() => formatNumber(bahtAmount.value));
    const formattedKyatToBahtResult = computed(() =>
      formatNumber(kyatToBahtResult.value)
    );
    const formattedKyatNeeded = computed(() => formatNumber(kyatNeeded.value));
    const formattedBahtToKyatResult = computed(() =>
      formatNumber(bahtToKyatResult.value)
    );
    const formattedBahtNeeded = computed(() => formatNumber(bahtNeeded.value));

    return {
      isBuying,
      kyatAmount,
      bahtAmount,
      kyatToBahtResult,
      kyatNeeded,
      bahtToKyatResult,
      bahtNeeded,
      buyingRate,
      sellingRate,
      toggleMode,
      handleKyatInput,
      handleBahtInput,
      formattedKyatAmount,
      formattedBahtAmount,
      formattedKyatToBahtResult,
      formattedKyatNeeded,
      formattedBahtToKyatResult,
      formattedBahtNeeded,
      resetFields,
    };
  },
});
</script>
