# GitHub Pages Deployment Guide

## Automatic Deployment Setup

Your site is configured to automatically deploy to GitHub Pages whenever you push to the `main` branch.

### One-Time Setup Steps

1. **Enable GitHub Pages in your repository**:
   - Go to your GitHub repository: https://github.com/AutoNateAI/Schools-Campaign
   - Click on **Settings** → **Pages** (in the left sidebar)
   - Under **Source**, select **GitHub Actions**
   - Save the settings

2. **Push your code**:
   ```bash
   git add -A
   git commit -m "Initial commit: AutoNateAI Schools website"
   git push -u origin main
   ```

3. **Wait for deployment**:
   - Go to the **Actions** tab in your GitHub repository
   - Watch the deployment workflow run
   - Once complete (usually 2-3 minutes), your site will be live!

### Your Site URL

After deployment, your site will be available at:

**https://autonateai.github.io/Schools-Campaign/**

---

## Manual Deployment (Alternative)

If you prefer to deploy manually instead of using GitHub Actions:

```bash
# Set your Git user info (if not already set)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Deploy using Docusaurus built-in command
npm run deploy
```

This will build and push directly to the `gh-pages` branch.

---

## Available Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Serve production build locally (to test before deploying)
npm run serve

# Deploy to GitHub Pages (manual method)
npm run deploy
```

---

## Troubleshooting

### If the site doesn't load after deployment:

1. **Check GitHub Actions**:
   - Go to the **Actions** tab
   - Look for any failed workflows
   - Click on the failed workflow to see error details

2. **Verify GitHub Pages settings**:
   - Settings → Pages
   - Source should be set to **GitHub Actions**

3. **Check the base URL**:
   - Make sure `baseUrl` in `docusaurus.config.ts` matches your repo name
   - Currently set to: `/Schools-Campaign/`

4. **Clear browser cache**:
   - Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

---

## Custom Domain (Optional)

If you want to use `schools.autonateai.com` instead:

1. **Add CNAME file**:
   - Create a file: `static/CNAME`
   - Content: `schools.autonateai.com`

2. **Update DNS settings**:
   - Add a CNAME record pointing to: `autonateai.github.io`

3. **Update docusaurus.config.ts**:
   ```typescript
   url: 'https://schools.autonateai.com',
   baseUrl: '/',
   ```

4. **Configure in GitHub**:
   - Settings → Pages → Custom domain
   - Enter: `schools.autonateai.com`
   - Wait for DNS check to complete

---

## Next Steps After Deployment

1. ✅ Verify the site loads correctly
2. ✅ Test all navigation links
3. ✅ Check mobile responsiveness
4. ✅ Test the "Sponsor Students" and "Contact" CTAs
5. ✅ Add your actual video to replace the placeholder
6. ✅ Update contact information in the footer
7. ✅ Add Google Analytics (optional)

---

## Updating the Site

Every time you make changes:

```bash
git add -A
git commit -m "Description of your changes"
git push
```

The site will automatically rebuild and redeploy within 2-3 minutes.

---

**Your site is ready to go live! 🚀**
