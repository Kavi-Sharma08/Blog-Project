import config from "../../config/config"

import { Client , ID ,Account } from "appwrite"

export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client.setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({email , password , name}){
        

        try {

            const user = await this.account.create(ID.unique() , email , password , name)

            if(user){

               return this.login({email ,password})

            }
            else{
                return user
            }
        } catch (error) {
            throw error
        }

    }

    async login({email ,password}){
        try {

            const user = await this.account.createEmailPasswordSession(email, password)

            return user
            
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            const user = await this.account.get();
            if(user){
                return user;
            }
            else{
                return null
            }
            
        } catch (error) {
            console.log("Error found : ")
            throw error
            
        }
    }

    async logout(){

        try {
            await this.account.deleteSessions();
            return true;
        } catch (error) {

            throw error
            
        }
        return false
    }

}

const authService = new AuthService();
export default authService