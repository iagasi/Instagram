import { log } from "console";
import r from "express";
import fs from "fs";
const router = r.Router();
import multer from "multer";
const upload = multer();
import { UserService } from "../services/userService";
import { postService } from "../services/postsService";
import { cloudinaryService } from "../services/clousdinaryService";

router.put("/user-photo/:id", upload.single("File"), async (req, res) => {
  const userId = req.params.id as string;

  if (!userId) return res.send("userId uncnown");

  try {
    const user = await UserService.getSingleUser(userId);
    if (!user) {
      return console.log(" user not found");
    }
   await cloudinaryService.removeFile(user?.image);
    const savedImage = await cloudinaryService.uploadFile(
      user._id.toString(),
      "user-images",
      req.file
    );
    
    if (savedImage) {
      user.image = savedImage;
      user.save();
    }
  } catch (e) {
    console.log(e);
  }
  res.send("ok");
});
router.delete("/user-photo/:id", async (req, res) => {
  const userId = req.params.id as string;

  try {
    const user = await UserService.getSingleUser(userId);
    if (!user) {
      return console.log(" user not found");
    }
    await cloudinaryService.removeFile(user?.image);
    user.image = "";
    await user.save()
  } catch (e) {
    console.log(e);
  }

  res.send("ok");
});

router.put("/upload-post/:id", upload.single("File"), async (req, res) => {
  const userId = req.params.id as string;
  await postService.uploadPostImage(userId, req.file);
  res.send("ok");
});

router.delete("/upload-post/:id/:userId", async (req, res) => {
  const postId = req.params.id as string;
  const userId = req.params.userId;
  const status = await postService.deletePost(userId, postId);

  res.send("ok");
});
export const fileRouter = router;
