const conf = {
    appwriteURL : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectID : String(import.meta.env.VITE_APPWRITE_PROJECTID),
    appwriteDatabaseID : String(import.meta.env.VITE_APPWRITE_DATABASEID),
    appwriteCollectionID : String(import.meta.env.VITE_APPWRITE_COLLECTIONID),
    appwriteClientCollectionID : String(import.meta.env.VITE_APPWRITE_CLIENT_COLLECTIONID),
    appwriteFunctionID: String(import.meta.env.VITE_APPWRITE_FUNCTIONID),
    

}
console.log("Appwrite Config:", conf);


export default conf;