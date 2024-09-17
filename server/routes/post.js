import { postCreateSchema } from "../zodValidation/index.js";
import { User, Post } from "../models/index.js";
import { authMiddleware } from '../middleware/index.js'
import express from "express";
import cors from "cors";

const router = express.Router({ mergeParams: true });
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(cors({ origin: '*' }));

router.post('/', authMiddleware, async(req, res) => {
    const newData = req.body;
    newData.authorId = newData.userId;
    delete newData.userId;
    console.log(newData);

    const { success } = postCreateSchema.safeParse(newData);
    if (!success) {
      return res.status(411).json({ message: "Incorrect input" });
    }
    const dbUser = await User.findOne({ userId: newData.authorId });
    if (!dbUser) {
      return res.status(411).json({ message: "No such Account found with this username" });
    }
    try {
        const newEntry = new Post(newData);
        await newEntry.save();
        return res.status(201).json({ message: "Entry successfully created", postId: newEntry._id, newEntry: newEntry});
    } catch (error) {
        return res.status(500).json({ message: "Failed to create entry", error: error.message });
    }
});

router.put('/', authMiddleware, async (req, res) => {
    try {

        const _id = req.body.postId;
        const authorId = req.body.userId;
        const updates = req.body;
        delete updates._id;
        delete updates.userId;

        const dbUser = await User.findOne({ userId: authorId });
        if (!dbUser) {
            return res.status(411).json({ message: "No such Account found with this username" });
        }
        
        const post = await Post.findById(_id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.authorId.toString() !== authorId) {
            return res.status(403).json({ message: "You do not have permission to edit this post" });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            _id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/one/:id', authMiddleware, async (req, res) => {
    const userId = req.body.userId;

    const dbUser = await User.findOne({ userId: userId });
    if (!dbUser) {
        return res.status(411).json({ message: "No such Account found with this username" });
    }

    const postId = req.params.id;

    try {
        const post = await Post.findOne({_id: postId});

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

router.get('/all', authMiddleware, async (req, res) => {
    const userId = req.body.userId;

    const dbUser = await User.findOne({ userId: userId });
    if (!dbUser) {
        return res.status(411).json({ message: "No such Account found with this username" });
    }

    const { page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    if (pageNum < 1 || limitNum < 1) {
        return res.status(400).json({ message: "Page and limit must be positive integers" });
    }  

    try {

        const posts = await Post.find()
          .sort({ createdAt: -1 })            
          .skip((page - 1) * limit)             
          .limit(parseInt(limit));              
    
        const total = await Post.countDocuments();  
        const totalPages = Math.ceil(total / limit);
    
        res.json({
          posts,
          totalPages,
          currentPage: parseInt(page),
        });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

router.get('/filter', authMiddleware, async (req, res) => {
    const userId = req.body.userId;

    const dbUser = await User.findOne({ userId: userId });
    if (!dbUser) {
        return res.status(411).json({ message: "No such Account found with this username" });
    }

    const { authorId, categoryId, status, risk, page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    if (pageNum < 1 || limitNum < 1) {
        return res.status(400).json({ message: "Page and limit must be positive integers" });
    }

    let query = {};
    if (categoryId) query.categoryId = categoryId;
    if (status) query.status = status;
    if (risk) query.risk = risk;
    if (authorId) query.authorId = authorId;

    try {
        const posts = await Post.find(query)
            .sort({ createdAt: -1 })             
            .skip((pageNum - 1) * limitNum)      
            .limit(limitNum);                    

        const total = await Post.countDocuments(query);
        const totalPages = Math.ceil(total / limitNum);
  
        res.json({
            posts,
            totalPages,
            currentPage: pageNum,
        });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});





export default router;