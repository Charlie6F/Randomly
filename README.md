# Randomly

A simple web application that generates random gradient backgrounds using Cloudflare Workers. Each time you refresh the page, a new gradient is displayed with a smooth transition effect.
[Demo](https://charlie6f.github.io/Randomly/)

## Features

- Generates random linear, radial, or conic gradients
- Uses a predefined set of color palettes for visually appealing combinations
- Smooth background transition effect
- Lightweight and fast, powered by Cloudflare Workers
- Simple HTML page with a single CSS class for the gradient background

## How It Works

The application is built using a Cloudflare Worker script (`worker.js`) that handles HTTP requests and generates dynamic content:

1. **Color Palettes**: A predefined array of color pairs ensures aesthetically pleasing gradients.
2. **Gradient Generation**: Randomly selects a gradient type (linear, radial, or conic) and a color palette, then constructs a CSS gradient string.
3. **Endpoints**:
   - `/gradient.css`: Returns a CSS file with a `.gradient-background` class containing the random gradient.
   - `/` or `/x`: Serves an HTML page that applies the gradient background and includes a message to refresh for a new gradient.
   - Other paths return a 404 response.

## Usage

1. Deploy the `worker.js` script to a Cloudflare Worker.
2. Access the root URL (`/`) or `/x` in a browser to view the gradient background.
3. Refresh the page to see a new random gradient.
4. The gradient is applied via a CSS file served at `/gradient.css`, which can be linked to any HTML page.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Charlie6F/Randomly.git
   ```

2. **Deploy to Cloudflare Workers**:
   - Install the Cloudflare Wrangler CLI:
     ```bash
     npm install -g wrangler
     ```
   - Log in to your Cloudflare account:
     ```bash
     wrangler login
     ```
   - Deploy the worker:
     ```bash
     cd Randomly
     wrangler deploy
     ```

3. **Access the Application**:
   - After deployment, Wrangler will provide a URL (e.g., `https://randomly.your-worker.workers.dev`).
   - Visit the URL in your browser to see the random gradient background.

## File Structure

- `cloudflare/worker/worker.js`: The main Cloudflare Worker script that handles requests, generates gradients, and serves content.

## Example

When you visit the root URL, you'll see a full-screen gradient background with a message: "Refresh the page to see a new random gradient!" Each refresh generates a new gradient with a smooth transition.

## Customization

To customize the gradients, modify the `colorPalettes` array in `worker.js` to include your preferred color pairs. You can also adjust the gradient types or transition timing in the CSS output.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.