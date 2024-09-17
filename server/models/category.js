import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  categoryId: {
    type: String,
    required: true,
    unique: true,
  },
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    trim: true 
  },
  url: { 
    type: String, 
    required: true, 
    validate: {
      validator: function(v) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  }
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
