import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [histogram, setHistogram] = useState([]);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
      setHistogram(response.data.histogram);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const data = {
    labels: Array.from({ length: 256 }, (_, i) => i),
    datasets: [
      {
        label: 'Pixel Intensity Frequency',
        data: histogram,
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageUpload} />
        <button type="submit">Upload and Analyze</button>
      </form>
      {histogram.length > 0 && <Bar data={data} />}
    </div>
  );
}

export default ImageUpload;
