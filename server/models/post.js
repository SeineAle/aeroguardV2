import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  authorId: { 
    type: String, 
    required: true 
  },

  title: { 
    type: String, 
    required: true 
  },

  content: { 
    type: String, 
    required: true 
  },

  categoryId: { 
    type: String,
    required: true 
  },

  risk: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'nightmare'], 
    required: true
  },

  status: { 
    type: String, 
    enum: ['active', 'resolved'], 
    default: 'active' 
  },

  createdAt: { 
    type: Date, 
    default: Date.now  
  }
});

const Post = mongoose.model("Post", postSchema);
export default Post;
