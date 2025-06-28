const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Function to generate a random color in hex format
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to generate a random gradient
function generateRandomGradient() {
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  const angle = Math.floor(Math.random() * 360);
  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}

// Middleware to generate and serve the CSS file
app.get('/gradient.css', (req, res) => {
  // Generate CSS content with a random gradient
  const cssContent = `
    .gradient-background {
      background: ${generateRandomGradient()};
      min-height: 100vh;
      width: 100%;
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
      <title>Random Gradient Demo</title>
      <link href="http://localhost:3000/gradient.css" rel="stylesheet">
    </head>
    <body class="gradient-background">
      <h1>Random Gradient Background</h1>
      <p>Refresh the page to see a new random gradient!</p>
    </body>
    </html>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 