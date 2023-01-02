<script lang="ts" setup>

defineProps<{
  modelValue: number | string;
  value: string | number;
}>()

</script>

<template>

<transition mode="out-in">
  <div v-if="modelValue === value" :key="value">
    <div class="grid grid-cols-2 gap-4 w-full text-red-500 bg-white p-4 rounded-xl shadow" :value="value">

      <slot />

    </div>
  </div>

</transition>

</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
  
}

.v-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.v-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
