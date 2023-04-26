import { USERS } from "@/models/mock-users";
import type User from "@/models/user";
import { iv, privateKey } from "@/private/ressource";
import CryptoJS from "crypto-js";


export default class AuthenticationService {
    static Users: User[] = USERS;
    static isAuthenticate: boolean = false;
    
    static login(username: string, password: string): Promise<boolean> {
        // Ici on fait un cryptage ce qui pourrait être considéré comme une faille SAUF si l'api recrypte la valeur ! :) Le password circule donc avec un cryptage jusqu'à l'api.
        // On est donc très sécure ;) 
        const cryptedPassword = CryptoJS.AES.encrypt(password, CryptoJS.enc.Utf8.parse(privateKey), {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC
        }).toString();
        const isAuthenticate = USERS.some(user => user.username === username && user.password === cryptedPassword);
        return new Promise(resolve => {
            setTimeout(() => {
                this.isAuthenticate = isAuthenticate;
                resolve(isAuthenticate);
            }, 700); // Je simule une latence          
            }
        );
    }
}