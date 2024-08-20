<script setup lang="ts">
import { useGlobalStore } from '../store/globalStore';
import { apis } from '../API/apis';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import Card from './Card.vue'
const globalStore = useGlobalStore()
const { localPath, storedPaths } = storeToRefs(globalStore)

onMounted(async () => {
    globalStore.updateStoredPaths(await apis.mainApp.getFolders())
})

const addPath = async () => {
    const updatedPaths = await apis.mainApp.addPath()
    globalStore.updateStoredPaths(updatedPaths)
}

</script>

<template>
    <div class="px-4 py-6">
        <div class="flex flex-col gap-y-2">
            <p class="text-xl font-bold">Your Files</p>
            <p>Home: {{ localPath }}</p>
            <button v-if="localPath.length < 1" @click="addPath()" class="bg-emerald-300 px-4 py-2 ">Add
                Folder</button>
            <Card v-if="localPath.length < 1" v-for="path in storedPaths" :onclick="() => { goToFolder(path) }"
                :title="path"></Card>

        </div>
        <!-- <div v-if="folderPaths.length > 0" class="flex flex-col gap-y-2">
            <p class="text-xl font-bold">Your Videos</p>
            <p>{{ folderLocalPath }}</p>
            <button v-if="folderLocalPath.length < 1" @click="addFolder()" class="bg-emerald-300 px-4 py-2 ">Add
                Folder</button>
            <button @click="backFromFolder()" v-else class="bg-emerald-300 px-4 py-2 ">Back</button>
            <div class="flex flex-wrap">
                <Card v-if="folderLocalPath.length < 1" v-for="path in folderPaths"
                    :onclick="() => { goToFolder(path) }" :title="getFolderNameFromPath(path)"></Card>

                <Card v-else v-for="fileInfo in files" :onclick="() => {
                    if (fileInfo.isDirectory) goToFolder(fileInfo.name);
                    else {
                        playVideo(fileInfo.name)
                    }
                }" :title="fileInfo.name"></Card>

            </div> -->

    </div>
</template>