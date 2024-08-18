interface TestApi{
    test: ()=>void,
    a: string    
}

interface Apis {
    testApi: TestApi
    mainApp: {
        // addPath: ()=>Promise<void>
        addPath: ()=>Promise<string[]>,
        getFolders: ()=>Promise<string[]>
    }
}

const apis:Apis = {
    testApi: (window as any).testApi,
    mainApp: (window as any).mainApp
}

export default apis