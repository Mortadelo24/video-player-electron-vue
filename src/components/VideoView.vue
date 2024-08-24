<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '../store/globalStore';

const globalStore = useGlobalStore()
const { playingVideoURL, currentVideoInfo } = storeToRefs(globalStore)

const goBack = async () => {
    playingVideoURL.value = null
    currentVideoInfo.value = null
}
const buttonStyle = "	 py-3 px-3 hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg      inline-block whitespace-nowrap "

const getNextVideo = () => {
    const videos = globalStore.videosOnCurrentFolder
    const currectIndex = videos.findIndex(v => v == currentVideoInfo.value)

    return videos[currectIndex + 1]
}
const getPreviousVideo = () => {
    const videos = globalStore.videosOnCurrentFolder
    const currectIndex = videos.findIndex(v => v == currentVideoInfo.value)

    return videos[currectIndex - 1]
}

</script>

<template>

    <div class="flex flex-nowrap h-full max-h-screen max-x-screen">

        <div class="w-full md:w-8/12 overflow-y-scroll flex flex-col gap-4 p-3	">

            <video v-if="currentVideoInfo" :src="currentVideoInfo.videoURL" class="rounded-lg shadow-lg aspect-video"
                controls></video>
            <p class="text-xl font-semibold  tracking-wide text-left text-pretty	">{{ currentVideoInfo.name }}</p>
            <div class=" flex gap-2">
                <button @click="goBack()" :class="buttonStyle">Back
                    to FileExplorer</button>
                <button v-show="globalStore.videosOnCurrentFolder[0] !== currentVideoInfo" :class="buttonStyle"
                    @click="currentVideoInfo = getPreviousVideo()">
                    Previous
                </button>
                <button
                    v-show="globalStore.videosOnCurrentFolder[globalStore.videosOnCurrentFolder.length - 1] !== currentVideoInfo"
                    :class="buttonStyle" @click="currentVideoInfo = getNextVideo()">
                    Next
                </button>


            </div>
        </div>
        <div class="w-4/12 flex  gap-4  hidden md:block overflow-y-scroll p-3 ">



            <div v-for="file in globalStore.videosOnCurrentFolder" @click="currentVideoInfo = file"
                :class="{ 'bg-gray-400': file == currentVideoInfo }" :key="file.uuid+'vd'"
                class="flex  flex-nowrap h-24 w-full mb-1.5 p-1.5 gap-2 rounded-lg cursor-pointer hover:shadow-md	">
                <video class="rounded-lg shadow-lg aspect-video" :src="file.videoURL"></video>
                <p class="truncate max-h-full	text-wrap 	"> {{ file.name }}</p>
            </div>


        </div>
    </div>



</template>