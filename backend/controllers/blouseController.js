import Blouse from "../models/Blouse.js";
import saveBase64Image from "../utils/saveBase64Image.js";

// Create blouse with multiple images + labels
export const createBlouse = async (req, res) => {
  try {
    const { name, description, category, price, color, fabricType, laces, images } = req.body;

    // Parse laces safely
    const laceArray = Array.isArray(laces) ? laces : laces ? [laces] : [];

    // Parse images (array of { label, base64 })
    let parsedImages = [];
    if (images && Array.isArray(images)) {
      parsedImages = images.map((img, i) => {
        const filepath = saveBase64Image(img.base64); // save to disk
        return {
          label: img.label || `Image ${i + 1}`,
          url: filepath,
        };
      });
    }

    const newBlouse = new Blouse({
      name,
      description,
      category,
      price,
      color,
      fabricType,
      images: parsedImages,
      laces: laceArray,
    });

    await newBlouse.save();
    res.status(201).json({ message: "Blouse created successfully", data: newBlouse });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get all blouses
export const getBlouses = async (req, res) => {
  try {
    const blouses = await Blouse.find().populate("laces");
    res.json(blouses);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Update blouse
export const updateBlouse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, price, color, fabricType, laces, images } = req.body;

    const laceArray = Array.isArray(laces) ? laces : laces ? [laces] : [];

    let updatedFields = { name, description, category, price, color, fabricType, laces: laceArray };

    // Handle new images if provided
    if (images && Array.isArray(images)) {
      updatedFields.images = images.map((img, i) => {
        const filepath = saveBase64Image(img.base64);
        return {
          label: img.label || `Image ${i + 1}`,
          url: filepath,
        };
      });
    }

    const blouse = await Blouse.findByIdAndUpdate(id, updatedFields, { new: true }).populate("laces");
    if (!blouse) return res.status(404).json({ error: "Blouse not found" });

    res.json({ message: "Blouse updated successfully", data: blouse });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
// Delete blouse
export const deleteBlouse = async (req, res) => {
  try {
    const { id } = req.params;
    const blouse = await Blouse.findByIdAndDelete(id);
    if (!blouse) return res.status(404).json({ error: "Blouse not found" });

    res.json({ message: "Blouse deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
