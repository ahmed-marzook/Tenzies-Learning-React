# Tenzies-Learning-React

Learning React and created a basic Tenzies game access [here](https://ahmed-marzook.github.io/Tenzies-Learning-React/)

# Deployment Guide

This guide provides instructions for deploying your Vite application to GitHub Pages, both with and without a custom domain.

## Prerequisites

- A Vite React project
- Node.js and npm installed
- A GitHub repository for your project
- Create a branch for GitHub Pages to deploy to

## Base Setup (Required for Both Methods)

### 1. Install Required Package

```bash
npm install --save-dev vite-plugin-gh-pages
```

### 2. Add Deployment Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "build": "vite build",
    "predeploy": "npm run build",
    "deploy": "vite-gh-pages"
  }
}
```

## Method 1: Standard GitHub Pages Deployment

This method deploys your app to `https://<username>.github.io/<repository-name>`.

### 1. Configure Vite for Standard Deployment

Update your `vite.config.js`:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ghPages from "vite-plugin-gh-pages";

export default defineConfig({
  plugins: [react(), ghPages()],
  base: "/<repository-name>/", // Replace with your repository name
});
```

### 2. Deploy

```bash
npm run deploy
```

Your app will be available at `https://<username>.github.io/<repository-name>`

## Method 2: Custom Domain Deployment

This method deploys your app to your custom domain (e.g., `https://app.yourdomain.com`).

### 1. Configure Package.json for Custom Domain

```json
{
  "name": "tenzies-learning-react",
  "private": true,
  "version": "0.0.0",
  "homepage": "https://<subdomain>.<your-domain>/",
  "type": "module",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "vite-gh-pages",
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

### 2. Configure Vite for Custom Domain

```javascript
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { ghPages } from "vite-plugin-gh-pages";
import fs from "node:fs";
import path from "node:path";

export default defineConfig({
  plugins: [
    react(),
    ghPages({
      // Add hook to persist CNAME file during deployment
      onBeforePublish: ({ outDir }) => {
        const CNAME = path.join(outDir, "CNAME");
        fs.writeFileSync(CNAME, "<subdomain>.<your-domain>"); // Replace with your domain
      },
    }),
  ],
  base: "/", // Base URL for custom domain
});
```

This configuration ensures your custom domain persists after each deployment by automatically creating a CNAME file during the build process.

### 3. Domain Setup

#### A. Domain Verification

1. In GitHub Organization Settings:

   - Go to your profile photo > "Your organizations"
   - Click "Settings" next to your organization
   - Navigate to "Security" > "Verified and approved domains"
   - Click "Add a domain"
   - Enter your domain and follow prompts

2. Add DNS TXT Record:
   - Type: TXT
   - Host/Name: @ or as specified by GitHub
   - Value: [GitHub-provided verification string]
   - Verify using:
     ```shell
     dig <your-TXT-record> +nostats +nocomments +nocmd TXT
     ```

#### B. DNS Configuration

Add CNAME record in your domain provider:

- Type: CNAME
- Name: `<your-subdomain>`
- Value: `<your-github-username>.github.io`
- TTL: 1/2 Hour

#### C. GitHub Pages Setup

1. Go to repository Settings > Pages
2. Enter your custom domain
3. Wait for DNS verification
4. Enable "Enforce HTTPS"

### 4. Content Security Policy

Add to your `index.html`:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
               font-src 'self' https://fonts.gstatic.com;
               img-src 'self' data: https:;
               script-src 'self' 'unsafe-inline' 'unsafe-eval';"
/>
```

## Troubleshooting

### Common Issues

1. **404 Errors**

   - Check relative asset paths
   - Verify base URL in vite.config.js
   - Check build output files

2. **DNS Issues**

   - Allow up to 24 hours for DNS propagation
   - Verify CNAME records
   - Use GitHub's DNS check feature

3. **Asset Loading**
   - Use relative file paths
   - Check Content Security Policy
   - Verify build output structure

## Maintenance

To update the deployed site:

1. Make changes to your code
2. Commit and push to main branch
3. Run `npm run deploy`

## References

- [vite-plugin-gh-pages Documentation](https://github.com/metonym/vite-plugin-gh-pages)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Documentation](https://vitejs.dev/)
