<script lang="ts" setup>

defineProps<{
  modelValue: number | string;
  tabList: string[];
}>()

const emit = defineEmits(["update:modelValue"])
</script>

<template>
  <div class="tabs flex gap-4">
    <button 
      v-for="(tab, index) in tabList" 
      :key="tab" 
      :class="{'bg-emerald-500 text-white': modelValue === tab.toLocaleLowerCase(), 'text-gray-600': modelValue !== tab.toLocaleLowerCase()}" 
      class="hover:bg-emerald-600 py-2 px-4 rounded font-semibold text-sm uppercase mb-2"
      @click="emit('update:modelValue', tab.toLocaleLowerCase())"
      >
      {{ tab }}
    </button>
  </div>
</template>

<style scoped></style>
