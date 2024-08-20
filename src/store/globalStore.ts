import { defineStore } from "pinia";
import { apis, FileInfo } from "../API/apis";
import { computed, ref } from "vue";

const useGlobalStore = defineStore("global", ()=>{
    // state
    const playingVideoURL =  ref<string | null>(null);
    const storedPaths = ref([] as string[]);
    const localPath = ref([] as FileInfo[]);
    const filesOnCurrentLocalPath = ref([] as FileInfo[])

    // computed
    const currentPath = computed(()=>{
      
        return localPath.value.map(fileInfo=>{
            return fileInfo.path ?? fileInfo.name

        }).join("\\")
    })
    
 


    // methods
    const updateStoredPaths = (updatedPaths: string[])=>{
     
        storedPaths.value = updatedPaths
    }
    const updateFilesCurrentLocalPath = (updatedFilesInfo: FileInfo[])=>{
        filesOnCurrentLocalPath.value = updatedFilesInfo
    
    }
    
 




    return {
        playingVideoURL,
        updateStoredPaths,
        updateFilesCurrentLocalPath,
        storedPaths,
        localPath,
        filesOnCurrentLocalPath,
        currentPath,
    }
})

export {
    useGlobalStore,
    
}