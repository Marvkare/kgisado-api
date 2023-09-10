import { config } from "dotenv";
import isOnline from "is-online"
config();

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || "31.170.167.102";
export const DB_USER = process.env.DB_USER || "u809868349_kgisadodb";
export const DB_PASSWORD = process.env.DB_PASSWORD || "Pescado1";
export const DB_DATABASE = process.env.DB_DATABASE || "u809868349_kgisadodb";
export const DB_PORT = process.env.DB_PORT || 3306;
export const conf = {secretUsuario: "una iguana"}
export const CLOUDINARY_CLOUD_NAME = 'dxlkk4cro'
export const CLOUDINARY_CLOUD_KEY = '682275991424834'
export const CLOUDINARY_API_SECRET ='-UbBrgrXbswNT4LZzF6L7z_WAJo'



export async function online  (){
    let on = ""
    await isOnline().then(online => {
    if (online) {
        on = true
        console.log('Estás conectado a Internet');
    } else {
        on = false
        console.log('No estás conectado a Internet');
    }
    });
    return on
}