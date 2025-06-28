const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Curated modern and elegant color palettes
const colorPalettes = [
  ['#FF6B6B', '#4ECDC4'], // Coral and Teal
  ['#A8E6CF', '#DCEDC1'], // Mint and Light Green
  ['#FFD3B6', '#FF8C94'], // Peach and Soft Pink
  ['#D4A5A5', '#9B59B6'], // Rose and Purple
  ['#3498DB', '#1ABC9C'], // Blue and Turquoise
  ['#F7DC6F', '#F0C05A'], // Yellow and Amber
  ['#E74C3C', '#C0392B'], // Red and Deep Red
];

// Function to randomly select a color palette
function getRandomPalette() {
  return colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
}

// Function to generate a random gradient (linear, radial, or conic)
function generateRandomGradient() {
  const types = ['linear', 'radial', 'conic'];
  const gradientType = types[Math.floor(Math.random() * types.length)];
  const [color1, color2] = getRandomPalette();
  let gradient;

  switch (gradientType) {
    case 'linear':
      const angle = Math.floor(Math.random() * 360);
      gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
      break;
    case 'radial':
      gradient = `radial-gradient(circle, ${color1}, ${color2})`;
      break;
    case 'conic':
      gradient = `conic-gradient(from ${Math.floor(Math.random() * 360)}deg, ${color1}, ${color2})`;
      break;
  }

  return gradient;
}

// Middleware to generate and serve the CSS file
app.get('/gradient.css', (req, res) => {
  // Generate CSS content with a random gradient
  const cssContent = `
    .gradient-background {
      background: ${generateRandomGradient()};
      min-height: 100vh;
      width: 100%;
      transition: background 0.5s ease; /* Smooth transition for gradient changes */
    }
  `;

  // Define the path for the temporary CSS file
  const cssFilePath = path.join(__dirname, 'gradient.css');

  // Write the CSS content to a temporary file
  fs.writeFileSync(cssFilePath, cssContent);

  // Serve the CSS file
  res.type('text/css');
  res.sendFile(cssFilePath, (err) => {
    if (err) {
      console.error('Error serving CSS file:', err);
      res.status(500).send('Error serving CSS file');
    }
  });
});

// Serve a sample HTML file to demonstrate usage
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Random Gradient Background</title>
      <link rel="stylesheet" href="/gradient.css">
      <style>
        body {
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: Arial, sans-serif;
          color: #fff;
          text-align: center;
          text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        }
        h1 {
          font-size: 2.5em;
        }
        p {
          font-size: 1.2em;
        }
      </style>
    </head>
    <body class="gradient-background">
      <div>
        <h1>Random Gradient Background</h1>
        <p>Refresh the page to see a new random gradient!</p>
      </div>
    </body>
    </html>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});