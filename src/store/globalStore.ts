import { defineStore } from "pinia";
import { apis, FileInfo } from "../API/apis";
import { ref } from "vue";

const useGlobalStore = defineStore("global", ()=>{
    // state
    const playingVideoURL =  ref<string | null>(null);
    const storedPaths = ref([] as string[]);
    const localPath = ref([] as string[]);
    const filesOnCurrentLocalPath = ref([] as FileInfo[])

    // methods
    const updateStoredPaths = (updatedPaths: string[])=>{
        storedPaths.value.length = 0
        storedPaths.value.push(...updatedPaths)
    }
    
 




    return {
        playingVideoURL,
        updateStoredPaths,
        storedPaths,
        localPath
    }
})

export {
    useGlobalStore
}