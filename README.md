# Tenzies-Learning-React

Learning React and created a basic Tenzies game access [here](https://ahmed-marzook.github.io/Tenzies-Learning-React/)

## Deployment

# Deploying Your Vite App to GitHub Pages

Welcome! This guide will help you deploy your Vite application to GitHub Pages in just a few simple steps. GitHub Pages is a great free hosting solution that makes your app available at `https://<username>.github.io/<repository-name>`.
Deployed to GitHub Pages using [vite-plugin-gh-pages](https://github.com/metonym/vite-plugin-gh-pages)

## Prerequisites

- A Vite React project
- Node.js and npm installed
- A GitHub repository for your project

## Setup Instructions

### 1. Install Required Package

First, let's add the GitHub Pages deployment plugin to your project:

```bash
npm install --save-dev vite-plugin-gh-pages
```

### 2. Configure Vite

Update your `vite.config.js` to use the plugin. This tells Vite how to build your project for GitHub Pages:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ghPages from "vite-plugin-gh-pages";

export default defineConfig({
  plugins: [react(), ghPages()],
  base: "/<repository-name>/", // Replace with your repository name
});
```

### 3. Add Deployment Scripts

Add these scripts to your `package.json` to make deployment easy:

```json
{
  "scripts": {
    "build": "vite build",
    "predeploy": "npm run build",
    "deploy": "vite-gh-pages"
  }
}
```

### 4. Deploy! 🚀

When you're ready to share your app with the world, just run:

```bash
npm run deploy
```

That's it! Your app will be built and deployed to the `gh-pages` branch of your repository. After a few minutes, you can visit `https://<username>.github.io/<repository-name>` to see your live app!

## Troubleshooting Tips

- Make sure your repository name is exactly the same in the `base` config as it appears in GitHub
- If your site isn't appearing, check that GitHub Pages is enabled in your repository settings
- Allow a few minutes for your changes to appear after deploying

Need help? Feel free to open an issue in the repository!
