interface TestApi{
    test: ()=>void,
    a: string    
}

export interface FileInfo{
    isDirectory: boolean
    name: string
}

interface Apis {
    testApi: TestApi
    mainApp: {
        // addPath: ()=>Promise<void>
        addPath: ()=>Promise<string[]>,
        getFolders: ()=>Promise<string[]>,
        getFoldersContent: (path: string)=>Promise<FileInfo[]>
    }
}

export const apis:Apis = {
    testApi: (window as any).testApi,
    mainApp: (window as any).mainApp
}
