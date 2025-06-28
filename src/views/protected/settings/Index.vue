<template>
  <div>
    <div class="mb-[32px]">
      <h4 class="font-semibold text-lg">Access Code Settings</h4>
      <p class="text-sm">Update the expiry duration for access codes.</p>
    </div>

    <div class="bg-white p-[20px] rounded-lg max-w-md">
      <form @submit.prevent="updateExpiry">
        <div class="mb-6">
          <label for="expiry" class="block mb-2 text-sm font-medium text-gray-700">Access Code Expiry (in hours)</label>
          <input
            id="expiry"
            type="number"
            min="1"
            class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm rounded-lg"
            v-model.number="expiry"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full h-[40px] bg-[#004225] text-white text-sm font-medium rounded-lg"
          :disabled="loading"
        >
          <span v-if="loading" class="animate-spin mr-2 inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full"></span>
          Update Expiry
        </button>
      </form>
      <p v-if="success" class="text-green-600 mt-4">Expiry updated successfully!</p>
      <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const expiry = ref<number>(24); // default 24 hours
const loading = ref(false);
const success = ref(false);
const error = ref<string | null>(null);

function updateExpiry() {
  loading.value = true;
  success.value = false;
  error.value = null;

  // Simulate API call
  setTimeout(() => {
    loading.value = false;
    // Simulate success
    success.value = true;
  }, 1200);
}
</script>