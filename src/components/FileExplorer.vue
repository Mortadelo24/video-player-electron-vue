<script setup lang="ts">
import { useGlobalStore } from '../store/globalStore';
import { FileInfo, IpcService } from '../interfaces/global';
import { onMounted } from 'vue';
import { Buffer } from 'buffer';
import { storeToRefs } from 'pinia';
import Card from './Card.vue'
const globalStore = useGlobalStore()
const { localPath, filesOnCurrentLocalPath } = storeToRefs(globalStore)

// ipcService
const ipcService = (window as any).ipcService as IpcService

onMounted(async () => {
    globalStore.updateFilesCurrentLocalPath(await ipcService.invoke('getter:getFolderContent'))
})
const addPath = async () => {
    await ipcService.invoke('dialog:addPathToFolder')
    globalStore.updateFilesCurrentLocalPath(await ipcService.invoke('getter:getFolderContent'))
}
const goTo = async (fileInfo: FileInfo)=>{
    localPath.value.push(fileInfo)
    globalStore.updateFilesCurrentLocalPath(await ipcService.invoke('getter:getFolderContent', globalStore.currentPath))
}
const goBack = async()=>{
    localPath.value.pop()
    globalStore.updateFilesCurrentLocalPath(await ipcService.invoke('getter:getFolderContent', globalStore.currentPath))

}
const getVideoURL= (path: string)=>{
    return 'http://localhost:2509/getVideo/' + Buffer.from(path, "utf8").toString("base64")
}

</script>

<template>
    <div class="px-4 py-6">
        <div class="flex flex-col gap-y-2">
            <p class="text-xl font-bold">Your Files</p>
            <div class="flex flex-row gap-2">
                <p>Home\</p>
                <p v-for="item in localPath" :key="item.name+'naveinnerItem'">{{ item.name }}\</p>
            </div>
            <p>Current path: {{ globalStore.currentPath }}</p>
            <button v-if="localPath.length < 1" @click="addPath()" class="bg-emerald-300 px-4 py-2 ">Add
                Folder</button>
            <button @click="goBack()" v-else class="bg-emerald-300 px-4 py-2 ">Back</button>

            
            <div class="flex flex-wrap	">
                <Card  v-for="fileInfo in filesOnCurrentLocalPath" :onclick="() => fileInfo.isDirectory? goTo(fileInfo):globalStore.playingVideoURL =   getVideoURL(globalStore.currentPath +'\\'+ fileInfo.name)"
                    :title="fileInfo.name" :key="fileInfo.name"></Card>
            </div>
                
        </div>
    
    </div>
</template>