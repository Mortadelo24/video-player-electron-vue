<script setup lang="ts">
import FileExplorer from './FileExplorer.vue';
import VideoPlayer from './VideoPlayer.vue';
import { useGlobalStore } from '../store/globalStore';
import { storeToRefs } from 'pinia';

const globalStore = useGlobalStore()
const { playingVideoURL } = storeToRefs(globalStore);
</script>

<template>
  <div class="grid justify-items-center	">
    <div class="bg-slate-100		min-w-80	w-full h-screen	">
      <nav class="bg-slate-600 text-white flex justify-start p-4 items-baseline gap-x-2">
        <p class="font-sans text-xl">Video Player</p> <small class="font-mono text-xs">by Jose Miranda</small>
      </nav>
      <VideoPlayer v-if="playingVideoURL"></VideoPlayer>
      <FileExplorer v-show="!playingVideoURL"></FileExplorer>

    </div>
  </div>
</template>
