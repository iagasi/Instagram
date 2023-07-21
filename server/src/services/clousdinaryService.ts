import { v2 as cloudinary } from "cloudinary";
import uuid from "uuid-random";
import { CLOUD_KEY, CLOUD_NAME, CLOUD_SECRET } from "../serverConstants";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
});

type Destination = "user-images" | "images";

class CloudinaruService {
  uploadFile(
    userId: string,
    destination: Destination,
    fileBuffer: Express.Multer.File | undefined
  ):Promise<string|undefined>|null {
    if (!fileBuffer) return null;
    const b64 = Buffer.from(fileBuffer.buffer).toString("base64");
    let dataURI = "data:" + fileBuffer.mimetype + ";base64," + b64;
    const Name = `${destination}/${fileBuffer.fieldname}`;
return new Promise((res,rej)=>{

     cloudinary.uploader.upload(
      dataURI,

      {
        resource_type: "image",
        // public_id:Name
      },
      function (error, result) {
        if (result) {
          res(result?.url);
        }
        if(error){
            console.log(error);
           rej()
        }
      }
    );
})
   
  }
 async removeFile(filePath: string){
    console.log(filePath);
    const arr=filePath.split("/")
    const publicId=arr[arr.length-1].split(".")[0]
    console.log(publicId);
    if(!publicId)return
   const res=  await cloudinary.uploader.destroy(publicId,{resource_type:"image",});
   console.log(res);
   
   return res
  }
}

export const cloudinaryService = new CloudinaruService();
