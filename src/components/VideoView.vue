<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '../store/globalStore';
import VideoPlayer from './VideoPlayer.vue';

const globalStore = useGlobalStore()
const { playingVideoURL } = storeToRefs(globalStore)

const goBack = async () => {
    playingVideoURL.value = null
}



</script>

<template>
    <button @click="goBack()" class="w-24	 py-3 px-3 hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg      inline-block whitespace-nowrap ">Back</button>
    <VideoPlayer :src="playingVideoURL"></VideoPlayer>
    
</template>