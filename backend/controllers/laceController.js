import Lace from "../models/Lace.js";

//create lace
// create lace
export const createLace = async (req, res) => {
  try {
    const { name, size, color } = req.body;
    const imagePath = req.file ? req.file.path : null;

    // Save into MongoDB
    const newLace = new Lace({
      name,
      size,
      color,
      image: imagePath,
    });

    await newLace.save();

    res.status(201).json({ message: "Lace created successfully", data: newLace });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


//get all laces
export const getLaces = async (req, res) => {
    try {  
        const laces = await Lace.find();
        res.json(laces);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

//Updae lace
// UPDATE lace
export const updateLace = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, color, size } = req.body;
    const imagePath = req.file ? req.file.path : undefined;

    const updatedFields = { name, color, size };
    if (imagePath) updatedFields.image = imagePath;

    const lace = await Lace.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!lace) return res.status(404).json({ error: "Lace not found" });
    res.json({ message: "Lace updated successfully", data: lace });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// DELETE lace
export const deleteLace = async (req, res) => {
  try {
    const { id } = req.params;
    const lace = await Lace.findByIdAndDelete(id);
    if (!lace) return res.status(404).json({ error: "Lace not found" });
    res.json({ message: "Lace deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};