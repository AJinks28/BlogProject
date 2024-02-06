
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
export class AuthService {
    //properties
    client = new Client();
    account;

    //constructor
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);

    }
  async createAccount({email,password,name}){
        try {
            //create user account with help of create() method
            const userAccount=await this.account.create(ID.unique() ,email,password,name);

            if (userAccount) {
                // sidha login kr do agar account create ho gya hai to
                return this.login({email,password})
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailSession(email,password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error
        }
    }
}

const authService= new AuthService()

export default authService;
