<script setup lang="ts">
import { ref } from 'vue'
import Card from './Card.vue';
import apis from '../API/apis'

const isFilePermission = ref(true)
const isMoreThanOneFolder = ref(false)

const addFolder = ()=>{
  apis.mainApp.addPath()
}


</script>

<template>
  <div class="grid justify-items-center	">
    <div class="bg-slate-100		min-w-80	w-full h-screen	">
      <nav class="bg-slate-600 text-white flex justify-start p-4 items-baseline gap-x-2">
        <p class="font-sans text-xl">Video Player</p> <small class="font-mono text-xs">by Jose Miranda</small>
      </nav>
      <div class="px-4 py-6">
        <div v-if="isFilePermission && isMoreThanOneFolder" class="flex flex-col gap-y-2">
          <p class="text-xl font-bold">Your Videos</p>
            <div class="flex flex-wrap	 ">
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
          </div>

        </div>
        <div v-else class="flex flex-col justify-center items-center text-center gap-y-4">

          <p class="text-xl font-bold">There is nothing here</p>
          <p class="text-sm font-mono">Please add a folder</p>
          <button @click="addFolder()"  class="bg-emerald-300 px-4 py-2" webkitdirectory>Add Folder</button>
        </div>
      </div>

    </div>
  </div>
</template>
