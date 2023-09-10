import {v2 as cloudinary} from 'cloudinary'
import { CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_KEY, CLOUDINARY_CLOUD_NAME,} from '../config.js'
cloudinary.config({ 
  cloud_name:CLOUDINARY_CLOUD_NAME , 
  api_key: CLOUDINARY_CLOUD_KEY, 
  api_secret:  CLOUDINARY_API_SECRET,
  secure:true
});

export async function uploadImage (filePaht){
    return await cloudinary.uploader.upload(filePaht,{
        folder: 'kgisado',
         
    })
}