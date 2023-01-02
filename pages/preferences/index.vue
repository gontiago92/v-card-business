<script lang="ts" setup>
import { useForm, useField, useFieldArray, Field } from 'vee-validate';

useValidation()

definePageMeta({
  layout: "settings"
})

const supabase = useSupabaseClient()
const activeTab = ref('accordion-collapse-body-1')
const router = useRouter()
const {data: metainfo} = await useFetch("/api/meta")



const toggleAccordion = (el) => {
  if(activeTab.value === el) {
    activeTab.value = null
    return
  }
  activeTab.value = el
}

/**
 * Form
 */

// # Validation rules

function validateField(value) {
  if (!value) {
    return 'this field is required';
  }

  if (value.length < 4) {
    return 'this field must contain at least 8 characters';
  }

  return true;
}
// #end Validation rules


 const formValues = {
  name: {
    first: metainfo.value.name.first,
    last: metainfo.value.name.last,
  },
  phone: {
    mobile: metainfo.value.phone.mobile,
    work: metainfo.value.phone.work,
  },
  ...metainfo.value
};


const schema = {
  'name.first': "required",
  'name.last': "required",
  'phone.mobile': "required",
  'phone.work': "required",
  'email': "required|email",
}

 
const { handleSubmit, isSubmitting, submitCount } = useForm({
  initialValues: formValues,
  validationSchema: schema
});

const { value: firstname, errorMessage: firstnameError } = useField('name.first');
const { value: lastname, errorMessage: lastnameError } = useField('name.last');
const { value: mobileNumber, errorMessage: mobileNumberError } = useField('phone.mobile');
const { value: workNumber, errorMessage: workNumberError } = useField('phone.work');
const { value: email, errorMessage: emailError } = useField('email');
const { value: company, errorMessage: companyError } = useField('company');
const { value: jobTitle, errorMessage: jobTitleError } = useField('jobTitle');

const { remove, push, fields } = useFieldArray('social');


/**
 * Handling submission and errors
 */

function onInvalidSubmit({ values, errors, results }) {
  console.log(values); // current form values
  console.log(errors); // a map of field names and their first error message
  console.log(results); // a detailed map of field names and their validation results
}


const onSubmit = handleSubmit(async values => {
  
  const {data} = await useFetch("/api/meta", {
    method: "PUT",
    body: values
  })

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(console.log(JSON.stringify(values, null, 2)))
    }, 2000)
  })
}, onInvalidSubmit);


// too many attempts
const isTooManyAttempts = computed(() => {
  return submitCount.value >= 10;
});


/**
 * Allowed Social Media fields
 */

const allowedSocialMedia = ref([
  {
    title: '@facebook',
    icon: 'mdi-facebook',
    url: ""
  },
  {
    title: '@instagram',
    icon: 'mdi-instagram',
    url: ""
  },
  {
    title: '@linkedin',
    icon: 'mdi-linkedin',
    url: ""
  },
])

const socialMediaInUse = (currentSocialLinks, social) => {
  const alreadyExists = currentSocialLinks.find(item => item.value.title === social.title)

  if(alreadyExists === undefined) return false

  return true
}

const handleAddSocialMedia = (currentSocialLinks, social) => {

  const alreadyExists = currentSocialLinks.find(item => item.value.title === social.title)

  if(alreadyExists === undefined) {
    push(social)
  }

}

const uploadFile = async (event) => {
  const avatarFile = event.target.files[0]
  const { data, error } = await supabase.storage.from('profile').upload('public/avatar1.png', avatarFile)
  console.log(data)
  /* const { data, error } = await supabase.storage
  .from('profile')
  .upload('public/avatar1.png', avatarFile) */
}
</script>

<template>
  <div>
    <nav class="bg-emerald-500 py-2 px-4 text-white">
      <button @click="router.back()" class="hover:bg-gray-100/60 text-white/60 hover:text-emerald-500 rounded p-1">
        <Icon name="mdi:arrow-left" size="24" class="" />
      </button>
    </nav>

    <div class="p-4">
    
      <h1 class="text-2xl mb-4">Settings</h1>

      <div id="accordion-collapse" data-accordion="collapse">
        <h2 id="accordion-collapse-heading-1">
          <button @click="toggleAccordion('accordion-collapse-body-1')" type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
            <span>Basic Information</span>
            <svg data-accordion-icon class="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </h2>
        <div v-show="activeTab === 'accordion-collapse-body-1'" id="accordion-collapse-body-1" aria-labelledby="accordion-collapse-heading-1">
          <div class="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            
            <form v-if="!isTooManyAttempts" @submit="onSubmit">
            

              <div class="flex items-center space-x-6 mb-4">
                <div class="shrink-0">
                  <img class="h-16 w-16 object-cover rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80" alt="Current profile photo" />
                </div>
                <label class="block">
                  <span class="sr-only">Choose profile photo</span>
                  <input type="file" class="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-emerald-50 file:text-emerald-700
                    hover:file:bg-emerald-100
                  "
                  @change="uploadFile"
                  />
                </label>
              </div>


              <div class="mb-6">
                <label for="firstname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <input v-model="firstname" type="text" id="firstname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Firstname" required>
                    <span class="text-sm text-red-500 font-medium">{{ firstnameError }}</span>
                  </div>
                  <div>
                    <input v-model="lastname" type="text" id="lastname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Lastname" required>
                    <span class="text-sm text-red-500 font-medium">{{ lastnameError }}</span>
                  </div>
                </div>
              </div>

              <div class="mb-6">
                <label for="firstname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <input v-model="mobileNumber" type="text" id="firstname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mobile" required>
                    <span class="text-sm text-red-500 font-medium">{{ mobileNumberError }}</span>
                  </div>
                  <div>
                    <input v-model="workNumber" type="text" id="lastname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Work" required>
                    <span class="text-sm text-red-500 font-medium">{{ workNumberError }}</span>
                  </div>
                </div>
              </div>

              
              <div class="mb-6">
                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <input v-model="company" type="text" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Company" required>
                    <span class="text-sm text-red-500 font-medium">{{ companyError }}</span>
                  </div>
                  <div>
                    <input v-model="jobTitle" type="text" id="jobTitle" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Job Title" required>
                    <span class="text-sm text-red-500 font-medium">{{ jobTitleError }}</span>
                  </div>
                </div>
              </div>

              <div class="mb-6">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input v-model="email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required>
                <span class="text-sm text-red-500 font-medium">{{ emailError }}</span>
              </div>

              <button class="bg-emerald-500 px-4 py-2 rounded-lg shadow text-white disabled:bg-gray-500/60 disabled:text-gray-200" type="submit" :disabled="isSubmitting">
              <div v-if="isSubmitting" >
                <Icon name="icomoon-free:spinner9" class="animate-spin mr-2" />
                <span>Processing...</span>
              </div>
              <span v-else>Save</span>
              </button>
            </form>

            <p v-else>Sorry but you have attempted to submit too many times</p>

          </div>
        </div>
        <h2 id="accordion-collapse-heading-2">
          <button @click="toggleAccordion('accordion-collapse-body-2')" type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
            <span>Social Media</span>
            <svg data-accordion-icon class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </h2>
        <div v-show="activeTab === 'accordion-collapse-body-2'" id="accordion-collapse-body-2" aria-labelledby="accordion-collapse-heading-2">
          <div class="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700">
           


            <form @submit="onSubmit" novalidate>

              <div v-for="(field, idx) in fields" :key="field.key">

                <div class="flex gap-2 mb-2">

                  <div class="w-full">
                    <div class="bg-red-500 rounded-lg relative w-full">
                      <input :value="field.value.url" @input="event => field.value.url = event.target.value" :name="`social[${idx}].url`" type="url" id="url" class="pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter url" required>
                      <Icon :name="field.value.icon" size="24" class="absolute top-3/12 ml-2" />
                    </div>
                    <span class="text-sm text-red-500 font-medium">{{ firstnameError }}</span>
                  </div>
                  <button type="button" @click="remove(idx)">
                    <Icon name="mdi-close" class="bg-red-500 text-white w-6 h-6 rounded p-0.5" />
                  </button>
                </div>

              </div>
              <button type="button" @click="push({ title: '', url: '', icon: '' })">Add</button>

              <div class="flex items-center gap-2">
                <button 
                v-for="social in allowedSocialMedia"
                class="border border-gray-500 text-gray-500 rounded-xl px-4 px-2 w-12 h-12" 
                :class="{'bg-emerald-500 text-gray-50 border-0 shadow': socialMediaInUse(fields, social)}" 

                @click.prevent="handleAddSocialMedia(fields, social)"
                >
                  <Icon :name="social.icon" size="24" />
                </button>
              </div>

              <button class="mt-4 bg-emerald-500 px-4 py-2 rounded-lg shadow text-white disabled:bg-gray-500/60 disabled:text-gray-200" type="submit" :disabled="isSubmitting">
              <div v-if="isSubmitting" >
                <Icon name="icomoon-free:spinner9" class="animate-spin mr-2" />
                <span>Processing...</span>
              </div>
              <span v-else>Save</span>
              </button>
            </form>

            <!-- <form class="mb-4"> 
                            @click="social.use = !social.use"
                <template v-for="(social, index) in allowedSocialMedia" :key="social">
                <div v-if="social.use" class="mb-2">
                  <div class="bg-red-500 rounded-lg relative">
                    <input v-model="socialArray" type="text" id="social" class="pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Firstname" required>
                    <Icon :name="social.icon" size="24" class="absolute top-3/12 ml-2" />
                  </div>
                  <span class="text-sm text-red-500 font-medium">{{ firstnameError }}</span>
                </div>
              </template>
            </form> -->




           
          </div>
        </div>
        <h2 id="accordion-collapse-heading-3">
          <button @click="toggleAccordion('accordion-collapse-body-3')" type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
            <span>What are the differences between Flowbite and Tailwind UI?</span>
            <svg data-accordion-icon class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </h2>
        <div v-show="activeTab === 'accordion-collapse-body-3'" id="accordion-collapse-body-3" aria-labelledby="accordion-collapse-heading-3">
          <div class="p-5 font-light border border-t-0 border-gray-200 dark:border-gray-700">
            <p class="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.</p>
            <p class="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.</p>
            <p class="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
            <ul class="pl-5 text-gray-500 list-disc dark:text-gray-400">
              <li><a href="https://flowbite.com/pro/" class="text-blue-600 dark:text-blue-500 hover:underline">Flowbite Pro</a></li>
              <li><a href="https://tailwindui.com/" rel="nofollow" class="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a></li>
            </ul>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
@keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}
</style>
