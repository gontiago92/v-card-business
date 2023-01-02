<script lang="ts" setup>

const {data: metainfo} = await useFetch("/api/meta")

const name = computed(() => `${metainfo.value.name.first} ${metainfo.value.name.last}`)
</script>

<template>
  <div class="py-2 px-4 bg-white rounded shadow text-black">
    <ul>
      <li class="mb-4"><h3 class="text-2xl text-emerald-500 font-semibold flex items-center gap-2"><Icon name="wpf:business-contact" size="24"/> Contact</h3></li>
      <li class="text-gray-500 pt-2">Name</li>
      <li class="text-lg pb-2 border-b last:border-b-0">{{ name }}</li>
      <li class="text-gray-500 pt-2">Name</li>
      <li class="text-lg pb-2 border-b last:border-b-0">{{ metainfo.email }}</li>
      <li class="text-gray-500 pt-2">Phone</li>
      <li class="text-lg pb-2 border-b last:border-b-0 flex justify-between">
      
        <div class="flex flex-col">
          <span class="text-sm text-emerald-500 font-semibold">Mobile</span>
          <NuxtLink :to="`tel:${metainfo.phone.mobile}`">{{ metainfo.phone.mobile }}</NuxtLink>
        </div>

        <div class="flex flex-col">
          <span class="text-sm text-emerald-500 font-semibold">Work</span>
          <NuxtLink :to="`tel:${metainfo.phone.work}`">{{ metainfo.phone.work }}</NuxtLink>
        </div>

      </li>
      <li class="text-gray-500 pt-2">Company</li>
      <li class="text-lg pb-2 border-b last:border-b-0 font-bold">{{ metainfo.company }}</li>
    </ul>
  </div>
</template>

<style scoped></style>
