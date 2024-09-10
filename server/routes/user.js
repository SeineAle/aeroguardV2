import { userSigninSchema, userSignupSchema } from "../zodValidation/index.js";
import { User } from "../models/index.js";
import express from "express";
import cors from "cors";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";


const router = express.Router({ mergeParams: true });
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(cors({ origin: '*' }));

router.post("/signin", async (req, res) => {
  const userDeatils = req.body;
  console.log(userDeatils);
  const { success } = userSigninSchema.safeParse(userDeatils);
  if (!success) {
      return res.status(411).json({ message: "Incorrect input" });
  }
  
  try {
      const dbUser = await User.findOne({ userId: userDeatils.userId });
      if (!dbUser) {
          return res.status(411).json({ message: "No such Account found with this username" });
      }

      const passwordMatch = await bcrypt.compare(userDeatils.password, dbUser.password);
      if (!passwordMatch) {
          return res.status(411).json({ message: "No such Account found with this password" });
      }
      const payload = {
        userId: dbUser.userId,
      };
      const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET_KEY);
      res.status(200).json({ token: token, userDetails: dbUser });
  } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/signup", async (req, res) => {
  const userDeatils = req.body;
  console.log(userDeatils);
  const { success } = userSignupSchema.safeParse(userDeatils);
  if (!success) {
      return res.status(411).json({ message: "Incorrect input" });
  }

  const userId = await User.findOne({ userId: userDeatils.userId });
  const email = await User.findOne({ email: userDeatils.email });

  if (userId || email) {
    return res.status(411).json({ message: "Username / Email already taken" });
  }

  const newUser = new User(userDeatils);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newUser.password, salt);
  newUser.password = hashedPassword;
  await newUser.save();

  const payload = {
    userId: newUser.userId,
  };

  const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET_KEY);

  res.status(200).json({
    message: "new user created successfully",
    token: token,
  });
});
export default router;