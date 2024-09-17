import cors from "cors";
import express from "express";
import userRouter from "./user.js";
import postRouter from "./post.js";

const router = express.Router({ mergeParams: true });
router.use(cors({ origin: '*' }));


router.get("/", (req, res) => {
  res.send("router used");
});

router.use("/user", userRouter);
router.use("/post", postRouter);

export default router;