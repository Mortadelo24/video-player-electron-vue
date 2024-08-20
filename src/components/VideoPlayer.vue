<script setup lang="ts">
import {  ref } from 'vue';

const videoElement = ref<null | Element>(null)  

const props = defineProps<{
    src: string
}>()
</script>

<template>
    <video :src="props.src" ref="videoContainer" class="w-full h-96 rounded-lg shadow-lg mx-auto"  controls></video>
</template>