import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./multer.config";
import multer from "multer";

const storage = (moduleFolder:string)=> new CloudinaryStorage({
    cloudinary : cloudinary,
    params : async(req,file) => {

        const originalName = file.originalname.split(".")[0];
        const extension = file.originalname.split(".")[1].toLocaleLowerCase() ;

        const uniqueName = `${originalName}-${Date.now()}.${extension}` ;

        const folder = extension === "pdf" ? "pdfs" : "images" ;

        return {
            folder : `FoodHub/${moduleFolder}/${folder}`,
            public_id : uniqueName
        }
    }
})

export const mealUpload = multer({storage : storage("Meals")}) ;