<script setup lang="ts">
import { ref } from 'vue';

const props  = defineProps<{
  title?: string
  imgSrc?: string
}>()
const title = ref(props.title || "No Title") 
const imgSrc = ref(props.imgSrc || "https://media.discordapp.net/attachments/891488165523767296/1274197107258953791/Frame_7.png?ex=66c16007&is=66c00e87&hm=f5b1bd0d3ad1a68dec49584d2ab2ef3352d0c927c6852196e60c14b8105c892b&=&format=webp&quality=lossless")


</script>
<template>

<div class=" rounded-lg cursor-pointer flex flex-col  max-w-80 max-h-72 m-2 p-2  gap-2 hover:shadow-md">
    <img class="rounded-lg max-w-full h-auto max-h-44 	" :src="imgSrc" :alt="imgSrc" draggable="false">
    <p class="text-base font-sans antialiased font-semibold max-h-24 overflow-hidden		truncate min-w-24 text-wrap">{{ title }}</p>
</div>
</template>