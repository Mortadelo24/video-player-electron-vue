import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { FileInfo } from "../interfaces/global";

const useGlobalStore = defineStore("global", () => {
    // state
    const playingVideoURL = ref<string | null>(null);
    const localPath = ref([] as FileInfo[]);
    const filesOnCurrentLocalPath = ref([] as FileInfo[])

    // computed
    const currentPath = computed(() => {

        return localPath.value.map(fileInfo => {
            return fileInfo.path ?? fileInfo.name

        }).join("\\")
    })





    // methods

    const updateFilesCurrentLocalPath = (updatedFilesInfo: FileInfo[]) => {
        filesOnCurrentLocalPath.value = updatedFilesInfo

    }
    const returnToPath = (uuid?: string) => {
        if (!uuid){
            localPath.value = [] 
        }
        const localPathCopy = localPath.value
        const newLocalPath = [] as FileInfo[]
        for (let i = 0; i < localPathCopy.length; i++) {
            newLocalPath.push(localPathCopy[i])
            if (localPathCopy[i].uuid == uuid) {
                break
            }
        }
        localPath.value = newLocalPath


    }






    return {
        playingVideoURL,
        updateFilesCurrentLocalPath,
        localPath,
        filesOnCurrentLocalPath,
        currentPath,
        returnToPath

    }
})

export {
    useGlobalStore,

}