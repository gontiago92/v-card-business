<script lang="ts" setup>

const {data: metainfo} = await useFetch("/api/meta")


</script>

<template>
  <div class="bg-white text-black px-4 py-2 rounded-lg shadow">

      <h3 class="text-2xl text-emerald-500 font-semibold flex items-center gap-2"><Icon name="wpf:business-contact" size="24"/> Bio</h3>

      <p class="p-2">{{ metainfo.bio }}</p>

  </div>
</template>

<style scoped></style>
