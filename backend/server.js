const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Image upload route
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const histogram = await getHistogram(filePath);
    res.json({ histogram });
  } catch (err) {
    res.status(500).send('Error processing image');
  }
});

async function getHistogram(imagePath) {
  const image = await sharp(imagePath).raw().toBuffer();
  const histogram = new Array(256).fill(0);
  image.forEach((pixel) => histogram[pixel]++);
  return histogram;
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
