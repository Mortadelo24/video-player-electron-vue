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
    <div class="flex flex-col px-4 pt-6 gap-6 h-full  max-h-full ">
        <p class="text-xl font-bold">Your Files</p>
        <div class="flex gap-2">
           
            <button v-if="localPath.length < 1" @click="addPath()"
                class="w-24	 py-3 px-3 hover:bg-gray-50 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg      inline-block whitespace-nowrap ">Add
                Folder</button>
            <button @click="goBack()" v-else
                class=" w-24 py-3 px-3 hover:bg-gray-50 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg      inline-block whitespace-nowrap ">Back</button>
                <FileExplorerNavBar></FileExplorerNavBar>
        </div>


        <div  v-if="filesOnCurrentLocalPath.length > 0"  class="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 h-full   overflow-y-scroll justify-items-center content-start">
            <Card v-for="fileInfo in filesOnCurrentLocalPath" :videoURL="fileInfo.videoURL"
                :onclick="() => fileInfo.isDirectory ? goTo(fileInfo) : globalStore.playingVideoURL = fileInfo.videoURL"
                :title="fileInfo.name" :key="fileInfo.name" :isDirectory="fileInfo.isDirectory"></Card>
        </div>
        <div v-else>
            <p class="font-bold	text-xl text-center mt-10">No Compatible files in this folder</p>
        </div>

    </div>
</template>