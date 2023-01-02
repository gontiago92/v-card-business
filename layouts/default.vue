<script lang="ts" setup>

const {data: metainfo} = await useFetch("/api/meta")

console.log(metainfo.value)

const tabIndex = ref("social")
</script>

<template>
  <div class="bg-white h-full">

    <header class="relative bg-emerald-500 flex flex-col justify-between gap-5 h-20vh">
      <div class="py-2 px-4 flex items-center justify-between">
        <div></div>
        <div>
          <NuxtLink to="/preferences">
            <Icon name="mdi-cog" size="24" class="text-gray-200 hover:text-white" />
          </NuxtLink>
        </div>
      </div>

      <div class="absolute bg-white shadow-xl w-96vw h-20vh ml-2vw top-5vh rounded-xl overflow-hidden">
      
        <div class="flex gap-2 h-full">
          <div class="avataroverflow-hidden h-full">
            <img src="https://images.unsplash.com/photo-1522307837370-cc113a36b784?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80" alt="" class="object-cover max-w-[130px] w-full h-full">
          </div>

          <div class="flex flex-col justify-around p-4 gap-2">
            
            <div>
              <h1 class="text-3xl">{{ metainfo.name.first }} <span class="font-bold uppercase">{{ metainfo.name.last }}</span></h1>

              <h3 class="text-sm font-semibold text-gray-500 uppercase">{{ metainfo.jobTitle }}</h3>
            </div>

            <div class="flex gap-4">
              <NuxtLink to="tel:691898436" class="w-10 h-10 bg-emerald-500 text-white flex justify-center items-center rounded-full hover:bg-emerald-700 cursor-pointer">
                <Icon name="material-symbols:phone-enabled-sharp" size="20" />
              </NuxtLink>
              <NuxtLink to="sms:691898436?body=" class="w-10 h-10 bg-emerald-500 text-white flex justify-center items-center rounded-full hover:bg-emerald-700 cursor-pointer">
                <Icon name="fa-solid:sms" size="20" />
              </NuxtLink>
              <NuxtLink to="mailto:john.doe@test.com" class="w-10 h-10 bg-emerald-500 text-white flex justify-center items-center rounded-full hover:bg-emerald-700 cursor-pointer">
                <Icon name="material-symbols:alternate-email" size="20" />
              </NuxtLink>
            </div>
          </div>
        </div>

      </div>

    </header>

    <div class="bg-gray-100 text-white pt-10vh h-80vh px-4">

      <div class="tabs flex gap-4">
        <NuxtLink to="/" class="hover:bg-emerald-600 py-2 px-4 rounded font-semibold text-sm uppercase mb-2 text-gray-600">
          Social
        </NuxtLink>
        <NuxtLink to="/contact" class="hover:bg-emerald-600 py-2 px-4 rounded font-semibold text-sm uppercase mb-2 text-gray-600">
          Contact
        </NuxtLink>
        <NuxtLink to="/bio" class="hover:bg-emerald-600 py-2 px-4 rounded font-semibold text-sm uppercase mb-2 text-gray-600">
          Bio
        </NuxtLink>
      </div>

      <div>
        <slot />
      </div>

    </div>

  </div>
</template>

<style scoped>
.router-link-active {
  @apply bg-emerald-500 text-white;
}
</style>
