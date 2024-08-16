<script setup lang="ts">
import { ref } from 'vue'

const isFilePermission = ref(false)

</script>

<template>
  <div class="grid justify-items-center	">
    <div class="bg-slate-100	 max-w-screen-lg	min-w-80	w-full h-screen	">
      <nav class="bg-slate-600 text-white flex justify-start p-4 items-baseline gap-x-2">
        <p class="font-sans text-xl">Video Player</p> <small class="font-mono text-xs">by Jose Miranda</small>
      </nav>
      <div class="px-4 py-6">
        <div v-if="isFilePermission" class="flex flex-col gap-y-2">
          <p class="text-xl font-bold">Your Videos</p>
          <div>
            Videos
          </div>

        </div>
        <div v-else class="flex flex-col justify-center items-center text-center gap-y-4">

          <p class="text-xl font-bold">Cannot acces to your videos</p>
          <p class="text-sm font-mono">The file permission is required to show your files here</p>
          <button class="bg-emerald-300 px-4 py-2">Give Acces</button>
          <input type="file" webkitdirectory>
        </div>
      </div>

    </div>
  </div>
</template>
