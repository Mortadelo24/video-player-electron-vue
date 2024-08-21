<script setup lang="ts">
import { useGlobalStore } from '../store/globalStore';
import { FileInfo } from '../interfaces/global';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import Card from './FileItem.vue'
import FileExplorerNavBar from './FileExplorerNavBar.vue';
import ipcService from '../API/ipcService';
const globalStore = useGlobalStore()
const { localPath, filesOnCurrentLocalPath } = storeToRefs(globalStore)

onMounted(async () => {
    globalStore.updateFilesCurrentLocalPath(await ipcService.invoke('getter:getFolderContent'))
})
const addPath = async () => {
    await ipcService.invoke('dialog:addPathToFolder')
    globalStore.updateFilesCurrentLocalPath(await ipcService.invoke('getter:getFolderContent'))
}
const goTo = async (fileInfo: FileInfo) => {
    localPath.value.push(fileInfo)
    globalStore.updateFilesCurrentLocalPath(await ipcService.invoke('getter:getFolderContent', globalStore.currentPath))
}
const goBack = async () => {
    localPath.value.pop()
    globalStore.updateFilesCurrentLocalPath(await ipcService.invoke('getter:getFolderContent', globalStore.currentPath))

}

</script>

<template>
    <div class="flex flex-col px-4 py-6 gap-2">
        <p class="text-xl font-bold">Your Files</p>
        <FileExplorerNavBar></FileExplorerNavBar>
        <button v-if="localPath.length < 1" @click="addPath()" class="bg-emerald-300 px-4 py-2 ">Add
            Folder</button>
        <button @click="goBack()" v-else class="bg-emerald-300 px-4 py-2 ">Back</button>

        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  ">
            <Card v-for="fileInfo in filesOnCurrentLocalPath" 
                :onclick="() => fileInfo.isDirectory ? goTo(fileInfo) : globalStore.playingVideoURL = fileInfo.videoURL"
                :title="fileInfo.name" :key="fileInfo.name" :isDirectory="fileInfo.isDirectory"></Card>
        </div>

    </div>
</template>