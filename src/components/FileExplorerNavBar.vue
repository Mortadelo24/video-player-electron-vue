<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '../store/globalStore';
import ipcService from '../API/ipcService';

const globalStore = useGlobalStore()
const { localPath } = storeToRefs(globalStore)


const returnTo = async(uuid?:string )=>{
    globalStore.returnToPath(uuid)
    globalStore.updateFilesCurrentLocalPath(await ipcService.invoke('getter:getFolderContent', globalStore.currentPath))
}

</script>

<template>
    <div class="relative overflow-x-auto bg-gray-100 px-4">
        <div class="flex items-center rounded-lg   ">
            <button @click="returnTo()" class="py-3 px-3 hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg      inline-block whitespace-nowrap">
                    Home
            </button>
            <div v-for="item in localPath" :key="item.uuid">
                <button @click="returnTo(item.uuid)"class="py-3 px-3 hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg      inline-block whitespace-nowrap">
                    {{ item.name }}
                </button>
            </div>

        </div>
    </div>

</template>