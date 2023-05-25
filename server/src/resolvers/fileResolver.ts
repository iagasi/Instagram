import { log } from "console";
import r from "express";
import fs from "fs";
const router = r.Router();
import multer from "multer";
const upload = multer();
import { UserService } from "../services/userService";
import { fileService } from "../services/fileService";
import { postService } from "../services/postsService";

router.put("/user-photo/:id", upload.single("File"), async (req, res) => {
  const userId = req.params.id as string;

  if (!userId) return res.send("userId uncnown");

  try {
    const user = await UserService.getSingleUser(userId);
    if (!user) {
      return console.log(" user not found");
    }
    fileService.removeFile(user?.image);
    const savedImage = fileService.uploadFile(user._id, "user-images", req.file);
    if (savedImage) user.image = savedImage;
    console.log(user);
  } catch (e) {
    console.log(e);
  }
  res.send("ok");
});
router.delete("/user-photo/:id",  async (req, res) => {
    const userId = req.params.id as string;

    try {
        const user = await UserService.getSingleUser(userId);
        if (!user) {
          return console.log(" user not found");
        }
        fileService.removeFile(user?.image);
       user.image="defaultUser.png"
     
      } catch (e) {
        console.log(e);
      }

    res.send("ok")
})

router.put("/upload-post/:id",upload.single("File"),(req,res)=>{

    const userId = req.params.id as string;
res.send(postService.uploadPostImage(userId,req.file))
})

router.delete("/upload-post/:id",async(req,res)=>{
    const postId = req.params.id as string;
const status=await postService.deletePost(postId)
console.log(status);

return status
})
export const fileRouter = router;
