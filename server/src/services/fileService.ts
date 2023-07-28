import { log } from "console";
import path from "path";
import fs from "fs";
import uuid from "uuid-random";

type Destination ="user-images"|"images"



class FileService {
  uploadFile(
    userId: string,
    destination: Destination,
    fileBuffer: Express.Multer.File | undefined
  ) {
    const buffer = fileBuffer?.buffer;
    if (!buffer) return;

    const randomName = uuid() + fileBuffer.originalname;

    const PATH = path.join(__dirname, "../../public",destination , randomName);
    fs.writeFile(PATH, buffer, (err) => {
      if (err) {
        throw new Error("File saving error" + err.message);
      }
    });
    return destination+"/"+ randomName;
  }

  removeFile(filePath: string) {
    const p = path.join(__dirname, "../../public", filePath);

    if (fs.existsSync(p)&&filePath) {
      fs.unlink(p, (err) => {
        if (err) {
        }
      });
    } else {
    }
  }
}

export const fileService = new FileService();
