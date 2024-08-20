<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '../store/globalStore';


const globalStore = useGlobalStore()
const { playingVideoURL } = storeToRefs(globalStore)

const goBack = async () => {
    playingVideoURL.value = null
}



</script>

<template>
    <button @click="goBack()" class="bg-emerald-300 px-4 py-2 ">Back</button>

    VideoPlayer: {{ playingVideoURL }}
    <video controls>
        <source :src="playingVideoURL" type="video/mp4">
    </video>
</template>