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
    <button @click="goBack()" class="bg-emerald-300 px-4 py-2 ">Back</button>

    VideoPlayer: {{ playingVideoURL }}
    <VideoPlayer :src="playingVideoURL"></VideoPlayer>
    
</template>