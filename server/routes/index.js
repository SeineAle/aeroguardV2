import cors from "cors";
import express from "express";
import userRouter from "./user.js";

const router = express.Router({ mergeParams: true });
router.use(cors({ origin: '*' }));


router.get("/", (req, res) => {
  res.send("router used");
});

router.use("/user", userRouter);

export default router;