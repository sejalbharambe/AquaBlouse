import fs from "fs";
import path from "path";

const saveBase64Image = (base64String, folder = "uploads") => {
  try {
    // Ensure uploads folder exists
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    // Extract mime type and data
    const matches = base64String.match(/^data:(.+);base64,(.+)$/);
    if (!matches) throw new Error("Invalid base64 format");

    const ext = matches[1].split("/")[1]; // e.g. png, jpg
    const data = matches[2];
    const buffer = Buffer.from(data, "base64");

    const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
    const filepath = path.join(folder, filename);

    fs.writeFileSync(filepath, buffer);

    // ✅ Instead of returning Windows path, return a public URL
    return `http://localhost:5000/${folder}/${filename}`;
  } catch (err) {
    throw new Error("Error saving image: " + err.message);
  }
};

export default saveBase64Image;
