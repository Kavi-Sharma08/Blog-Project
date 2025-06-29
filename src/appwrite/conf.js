import config from "../../config/config";
import { Client , ID , Databases , Storage, Query } from "appwrite";

export class Service{

    client = new Client();
    database;
    storage;

    constructor(){
        this.client.setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
        this.database = new Databases(this.client);
        this.storage = new Storage(this.client)
    }

    async createPost({title , slug , content , featuredImage , userId , status}){
        
        try {
            return await this.database.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
    
                }
            )
        } catch (error) {

            console.log("Appwrite Error : " , error.message)
            
        }

    }

    async updatePost(slug , {title , status , content , featuredImage}){
        try {
            await this.database.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    status,
                    featuredImage
    
                }
            )
        } catch (error) {
            console.log(error.message)
            
        }
    }

    async deletePost(slug){
        try {

            await this.database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
            
        } catch (error) {

            console.log(error.message)

            return false
            
        }

    }

    async getPost(){

        try {

            return await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [
                    Query.equal("status" , "active")
                ]
            )
            
        } catch (error) {
            console.log(error)

            return false
            
        }
    }

    async getSinglePost(slug){

        try {

            return await this.database.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            console.log(error);
            return false
            
        }
    }


    async uploadFile(file){
        
        console.log(config.appwriteBucketId)
        try {

            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
            
        } catch (error) {

            console.log(error)
            return false
            
        }
    }

    async deleteFile(fileId){
        

        try {

            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )

            return true
            
        } catch (error) {
            
            console.log(error);

            return false
        }
    }

    async getFilePreview(fileId){
        
        const image =  this.storage.getFileView(
            config.appwriteBucketId,
            fileId
        )
        return image.toString()
            
        
    }

}


const service = new Service();

export default service