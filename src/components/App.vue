<script setup lang="ts">
import FileExplorer from './FileExplorer.vue';
import VideoView from './VideoView.vue';
import { useGlobalStore } from '../store/globalStore';
import { storeToRefs } from 'pinia';

const globalStore = useGlobalStore()
const { currentVideoInfo } = storeToRefs(globalStore);
</script>

<template>
  <div class="bg-slate-100	w-screen h-screen max-h-screen max-w-screen 	">
    <!-- <nav class="bg-slate-600 text-white flex justify-start p-4 items-baseline gap-x-2">
        <p class="font-sans text-xl">Video Player</p> <small class="font-mono text-xs">by Jose Miranda</small>
      </nav> -->
    <VideoView v-if="currentVideoInfo"></VideoView>
    <FileExplorer v-show="!currentVideoInfo"></FileExplorer>
  </div>
</template>
