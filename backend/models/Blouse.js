import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  label: { type: String }, // e.g. front, back, sleeve
  url: { type: String, required: true }
});

const blouseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    price: { type: Number, required: true },
    color: { type: String },
    fabricType: { type: String },
    images: [imageSchema], // multiple images with names
    laces: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lace" }] // multiple lace IDs
  },
  { timestamps: true }
);

const Blouse = mongoose.model("Blouse", blouseSchema);
export default Blouse;
