<script lang="ts" setup>

const {data: metainfo} = await useFetch("/api/meta")


</script>

<template>
  <div class="bg-white text-black">
    <ul>
      <li>{{ metainfo }}</li>
    </ul>
  </div>
</template>

<style scoped></style>
