import { lightColorPalettes, darkColorPalettes } from './ColorPalettes.js';

function getRandomPalette(theme = 'light') {
  const palettes = theme === 'dark' ? darkColorPalettes : lightColorPalettes;
  console.log(palettes, darkColorPalettes, lightColorPalettes)
  return palettes[Math.floor(Math.random() * palettes.length)];
}

function generateRandomGradient(theme) {
  const types = ['linear', 'radial', 'conic'];
  const gradientType = types[Math.floor(Math.random() * types.length)];
  const [color1, color2] = getRandomPalette(theme);
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
  const theme = url.searchParams.get('theme') || 'light';

  if (path === '/gradient.css') {
    const cssContent = `
      .gradient-background {
        background: ${generateRandomGradient(theme)};
        min-height: 100vh;
        width: 100%;
        transition: background 0.5s ease;
      }
    `;
    return new Response(cssContent, {
      headers: { 'Content-Type': 'text/css' },
    });
  }

  if (path === '/' || path === '/x') {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Random Gradient Background</title>
        <link rel="stylesheet" href="/gradient.css?theme=${theme}">
      </head>
      <body class="gradient-background">
        <div style="text-align: center; padding: 50px; color: ${theme === 'dark' ? '#ffffff' : '#000000'};">
          <h1>Random Gradient Background</h1>
          <p>Refresh the page to see a new random gradient!</p>
          <p>Current theme: ${theme}</p>
        </div>
      </body>
      </html>
    `;
    return new Response(htmlContent, {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  return new Response('Not Found', { status: 404 });
}