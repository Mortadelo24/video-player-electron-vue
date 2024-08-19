<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import Card from './Card.vue';
import { apis, FileInfo } from '../API/apis';

const isFilePermission = ref(true)
const isPlayingVideo = ref(false)
const folderLocalPath = ref([] as string[])
const folderPaths = ref([] as string[])

const files = ref([] as FileInfo[]);

const addFolder = async()=>{
  const fPaths = await apis.mainApp.addPath()
  if (!fPaths) return 
  folderPaths.value.length = 0
  folderPaths.value.push(...fPaths)
}
const localPathToNormalPath = (listPath:string[])=>{
  return listPath.join("\\")
}

onMounted(async()=>{
  folderPaths.value.push(...await apis.mainApp.getFolders())
})
const getFolderNameFromPath = (path:string) =>{
  const pathStructure = path.split("\\")
  return pathStructure[pathStructure.length - 1]
}

const chargeCurrentFolderContent =async()=>{
  if (folderLocalPath.value.length <1 ) return 
  files.value.length = 0
  const folderContent = await  apis.mainApp.getFoldersContent(localPathToNormalPath(folderLocalPath.value)) 
  files.value.push(...folderContent)
}
const goToFolder =(path:string)=>{
  folderLocalPath.value.push(path)
 
  chargeCurrentFolderContent()
}
const backFromFolder = ()=>{
  folderLocalPath.value.pop()  
  chargeCurrentFolderContent()
  
}
const playVideo = ()=>{
  isPlayingVideo.value = true
  console.log(folderLocalPath)
}
</script>

<template>
  <div class="grid justify-items-center	">
    <div class="bg-slate-100		min-w-80	w-full h-screen	">
      <nav class="bg-slate-600 text-white flex justify-start p-4 items-baseline gap-x-2">
        <p class="font-sans text-xl">Video Player</p> <small class="font-mono text-xs">by Jose Miranda</small>
      </nav>
      <div v-if="!isPlayingVideo" class="px-4 py-6">
        <div v-if="isFilePermission && folderPaths.length > 0" class="flex flex-col gap-y-2">
          <p class="text-xl font-bold">Your Videos</p>
          <p>{{ folderLocalPath }}</p>
          <button v-if="folderLocalPath.length <1" @click="addFolder()"  class="bg-emerald-300 px-4 py-2 " >Add Folder</button>
          <button @click="backFromFolder()" v-else class="bg-emerald-300 px-4 py-2 ">Back</button>
            <div class="flex flex-wrap">
            <Card v-if="folderLocalPath.length < 1" v-for="path in folderPaths" :onclick="()=>{goToFolder(path)}"  :title="getFolderNameFromPath(path)"></Card>
            
            <Card v-else v-for="fileInfo in files" :onclick="()=>{
              if (fileInfo.isDirectory) goToFolder(fileInfo.name);
              else{
                playVideo()
              }
              }"  :title="fileInfo.name"></Card>

          </div>

        </div>
        <div v-else class="flex flex-col justify-center items-center text-center gap-y-4">

          <p class="text-xl font-bold">There is nothing here</p>
          <p class="text-sm font-mono">Please add a folder</p>
          <button @click="addFolder()"  class="bg-emerald-300 px-4 py-2" >Add Folder</button>
        </div>
      </div>
      <div v-else>
        playig video bro
      </div>

    </div>
  </div>
</template>
