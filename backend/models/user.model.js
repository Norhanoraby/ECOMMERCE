import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true,'Name is required']
    },
    email: {
      type: String,
      required: [true,'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true,'Password is required'],
      minlength: [6,'Password must be at least 6 characters']
    },
    cartItems: [
      {
        quantity: {
            type: Number,
            default: 1
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
      }
    ],
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer'
    }
  },
  // Automatically add createdAt and updatedAt fields
  {
    timestamps: true
  }
);
 

// Hash the password before saving the user to the database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return ;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    error;
  }
});

userSchema.methods.comparePassword = async function(Password) {
  return  bcrypt.compare(Password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;