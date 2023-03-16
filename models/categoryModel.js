import mongoose from "mongoose";

let categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

export default mongoose.model("categoryModel", categorySchema);
