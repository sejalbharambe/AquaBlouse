import mongoose from "mongoose";

const laceSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        color: { type: String, required: true },
        size: { type: String, required: true }, 
        image: { type: String, required: true },
    },
    {timestamps: true}
);

const Lace = mongoose.model("Lace", laceSchema);
export default Lace;