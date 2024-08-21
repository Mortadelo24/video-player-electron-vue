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
    <div class="flex flex-nowrap h-full max-h-screen max-x-screen">

        <div class="w-full sm:w-8/12 overflow-y-scroll flex flex-col gap-4 p-3	">
            <video v-if="playingVideoURL" :src="playingVideoURL" class="rounded-lg shadow-lg aspect-video"
                controls></video>
            <p>Video Title generic 123</p>


        </div>
        <div class="w-4/12 hidden sm:block overflow-y-scroll	 ">

            <button @click="goBack()"
                class="w-24	 py-3 px-3 hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg      inline-block whitespace-nowrap ">Back</button>
            Otros videos
        </div>
    </div>



</template>