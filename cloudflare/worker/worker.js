const colorPalettes = [
  ['#FF6B6B', '#4ECDC4'], // Coral and Teal
  ['#A8E6CF', '#DCEDC1'], // Mint and Light Green
  ['#FFD3B6', '#FF8C94'], // Peach and Soft Pink
  ['#D4A5A5', '#9B59B6'], // Rose and Purple
  ['#3498DB', '#1ABC9C'], // Blue and Turquoise
  ['#F7DC6F', '#F0C05A'], // Yellow and Amber
  ['#E74C3C', '#C0392B'], // Red and Deep Red
];

function getRandomPalette() {
  return colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
}

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

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/gradient.css') {
    const cssContent = `
      .gradient-background {
        background: ${generateRandomGradient()};
        width: 100%;
        transition: background 0.5s ease;
      }
    `;
    return new Response(cssContent, {
      headers: { 'Content-Type': 'text/css' },
    });
  }

  if (path === '/') {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Random Gradient Background</title>
        <link rel="stylesheet" href="/gradient.css">
      </head>
      <body class="gradient-background">
        <h1>Random Gradient Background</h1>
        <p>Refresh the page to see a new random gradient!</p>
      </body>
      </html>
    `;
    return new Response(htmlContent, {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  return new Response('Not Found', { status: 404 });
} 
