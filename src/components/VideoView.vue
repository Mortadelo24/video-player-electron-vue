<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '../store/globalStore';

const globalStore = useGlobalStore()
const { playingVideoURL, currentVideoInfo, filesOnCurrentLocalPath } = storeToRefs(globalStore)

const goBack = async () => {
    playingVideoURL.value = null
    currentVideoInfo.value = null
}
</script>

<template>
    <div class="flex flex-nowrap h-full max-h-screen max-x-screen">

        <div class="w-full md:w-8/12 overflow-y-scroll flex flex-col gap-4 p-3	">
            <video v-if="currentVideoInfo" :src="currentVideoInfo.videoURL" class="rounded-lg shadow-lg aspect-video"
                controls></video>
            <p class="text-xl font-semibold  tracking-wide text-left text-pretty	">{{ currentVideoInfo.name }}</p>


        </div>
        <div class="w-4/12 hidden md:block overflow-y-scroll	 ">

            <button @click="goBack()"
                class="w-24	 py-3 px-3 hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg      inline-block whitespace-nowrap ">Back</button>

            <div v-for="file in filesOnCurrentLocalPath">
                {{ file.name }}
            </div>


        </div>
    </div>



</template>