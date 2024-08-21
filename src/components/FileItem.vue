<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  title?: string
  imgSrc?: string
  isDirectory?: boolean
  videoURL?: string
}>()
const icons = {
  directory: "https://media.discordapp.net/attachments/891488165523767296/1274197107258953791/Frame_7.png?ex=66c16007&is=66c00e87&hm=f5b1bd0d3ad1a68dec49584d2ab2ef3352d0c927c6852196e60c14b8105c892b&=&format=webp&quality=lossless",
  mp4File: ""
}
const title = ref(props.title || "No Title")
const imgSrc = ref(props.imgSrc || icons.directory)
const video = ref<HTMLVideoElement | undefined>()
const isVideoReady = ref(false)

onMounted(() => {
  if (video.value ) {
    video.value.addEventListener("loadedmetadata", () => {
      video.value.muted = true
      video.value.currentTime = 3
      isVideoReady.value = true
      
    })
  }
})
</script>
<template>

  <div class="  rounded-lg cursor-pointer flex flex-col m-2 p-2  gap-2 hover:shadow-md">
    <div class="aspect-[16/9] ">
      <video v-if="props.videoURL" ref="video" class="rounded-lg object-fill" :src="props.videoURL"></video>
      <img v-else class="rounded-lg object-fill w-full" :src="imgSrc" :alt="imgSrc" draggable="false">

    </div>

    <p class="text-base font-sans antialiased font-semibold max-h-24 overflow-hidden		truncate min-w-24 text-wrap">{{
      title }}</p>
  </div>
</template>