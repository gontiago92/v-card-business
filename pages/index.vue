<script lang="ts" setup>

const {data: metainfo} = await useFetch("/api/meta")

console.log(metainfo.value)
</script>

<template>
<div class="grid grid-cols-2 gap-4 w-full">

  <NuxtLink v-for="social in metainfo.social" :to="social.url" class="group py-2 px-4 flex flex-col gap-2 bg-white text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-xl cursor-pointer">
    <Icon :name="social.icon ? social.icon : 'mingcute:external-link-line'" size="24" class="text-gray-600 group-hover:text-white" />
    <span class="font-semibold text-lg">{{ social.title }}</span>
  </NuxtLink>

</div>
</template>

<style scoped>
</style>
