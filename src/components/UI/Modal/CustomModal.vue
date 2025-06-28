<template>
  <div
    :class="`modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
  >
    <div
      @click="close"
      class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
    ></div>

    <div
      class="z-50 w-full max-h-[80%] mx-auto overflow-y-auto bg-white rounded-xl shadow-lg modal-container"
      :class="{ 'md:max-w-lg': !width, 'md:max-w-3xl': width }"
    >
      <div class="text-left modal-content">
        <!--Title-->
        <div
          class="flex items-center justify-between pb-3 border-b border-gray-50 py-[16px] px-[24px]"
          v-if="props.title"
        >
          <p
            class="text-lg font-bold text-black"
          >
            {{ props.title }}
          </p>
          <div class="z-50 cursor-pointer modal-close" @click="close">
            <i class="ri-close-large-fill"></i>
          </div>
        </div>

        <!--Body-->
        <div class="p-[24px]">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
  open.value = false;
};

const props = defineProps({
  title: String,
  show: Boolean,
  width: Boolean,
});

const open = ref(props.show);
</script>

<style>
.modal {
  transition: opacity 0.25s ease;
}
</style>
