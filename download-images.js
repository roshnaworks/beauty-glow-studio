// download-images.js
// Run this once with: node download-images.js
// Downloads all images locally into the /images folder

const https = require('https');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

const images = [
  { name: 'hero.jpg', url: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { name: 'salon-interior.jpg', url: 'https://images.pexels.com/photos/3993455/pexels-photo-3993455.jpeg?auto=compress&cs=tinysrgb&w=700' },
  { name: 'hair-styling.jpg', url: 'https://images.pexels.com/photos/3993456/pexels-photo-3993456.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'bridal-makeup.jpg', url: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'facial-treatment.jpg', url: 'https://images.pexels.com/photos/3997998/pexels-photo-3997998.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'eyebrow-shaping.jpg', url: 'https://images.pexels.com/photos/4046317/pexels-photo-4046317.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'body-care.jpg', url: 'https://images.pexels.com/photos/3865711/pexels-photo-3865711.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'nail-art.jpg', url: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'features.jpg', url: 'https://images.pexels.com/photos/3997381/pexels-photo-3997381.jpeg?auto=compress&cs=tinysrgb&w=800' }
];

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed: ${url} (status ${res.statusCode})`));
        return;
      }
      const fileStream = fs.createWriteStream(filepath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${path.basename(filepath)}`);
        resolve();
      });
    }).on('error', reject);
  });
}

(async () => {
  for (const img of images) {
    const filepath = path.join(imagesDir, img.name);
    try {
      await downloadImage(img.url, filepath);
    } catch (err) {
      console.error(`Error downloading ${img.name}:`, err.message);
    }
  }
  console.log('All done! Check the /images folder.');
})();