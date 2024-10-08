import mongoose from 'mongoose';

const { Schema } = mongoose;
const userSchema = new Schema({
    userId: {
      type: String,
      required: true,
      unique: true,
    },
  
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
  
    lastName: {
      type: String,
      required: false,
      trim: true,
    },
    
    email: {
      type: String,
      required: true,
      unique: true,
    },
  
    password: {
      type: String,
      required: true,
    },
  });
  
  const User = mongoose.model("User", userSchema);

  export default User;