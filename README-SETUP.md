# AutoNateAI Schools Website

A modern Docusaurus website for the AutoNateAI workshop sales funnel, featuring a clean UI with floating cards design.

## 🚀 Quick Start

```bash
# Navigate to the project directory
cd schools-website

# Install dependencies (if not already done)
npm install

# Start the development server
npm start
```

The site will open at `http://localhost:3000`

## 📦 Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the production site
- `npm run serve` - Serve the production build locally
- `npm run deploy` - Deploy to GitHub Pages (configure first)

## 🎨 Features

### Modern Design
- **Floating Cards**: Beautiful card-based layout with hover animations
- **Gradient Backgrounds**: Eye-catching purple gradient hero sections
- **Smooth Animations**: Fade-in effects and smooth transitions
- **Responsive Design**: Fully responsive for all device sizes

### Content Sections
1. **Hero Section**: Main headline with video placeholder and CTAs
2. **Why Section**: Benefits of the critical thinking workshop
3. **How It Works**: Workshop structure breakdown with 4-card grid
4. **Sponsorship Section**: What sponsors get with detailed benefits
5. **Why Districts Section**: 4 key reasons for district adoption
6. **Final CTA**: Strong closing call-to-action

## 🎯 Customization

### Adding Your Video
Replace the video placeholder in `src/pages/index.tsx`:

```tsx
<div className={styles.videoPlaceholder}>
  <iframe 
    width="100%" 
    height="400" 
    src="YOUR_VIDEO_URL" 
    frameBorder="0" 
    allowFullScreen
  />
</div>
```

### Updating Colors
Edit `src/css/custom.css` to change the color scheme:

```css
:root {
  --ifm-color-primary: #667eea; /* Change this */
}
```

### Modifying Content
Edit `src/pages/index.tsx` to update any section content.

### Styling Changes
- Page-specific styles: `src/pages/index.module.css`
- Global styles: `src/css/custom.css`

## 🔗 Adding Sponsor Links

Update the CTA buttons to link to your actual sponsorship platform:

```tsx
<Link
  className={clsx('button button--primary button--lg', styles.primaryCta)}
  to="https://your-sponsorship-url.com">
  🎓 Sponsor Students for the Next Workshop
</Link>
```

## 📱 Contact Form

To add a contact form, you can:
1. Use a service like Formspree, Netlify Forms, or Google Forms
2. Create a new page at `src/pages/contact.tsx`
3. Update the contact links in the navigation

## 🌐 Deployment

### Netlify (Recommended)
1. Push to GitHub
2. Connect to Netlify
3. Build command: `npm run build`
4. Publish directory: `build`

### Vercel
1. Push to GitHub
2. Import project in Vercel
3. It will auto-detect Docusaurus settings

### GitHub Pages
1. Update `docusaurus.config.ts` with your GitHub info
2. Run `npm run deploy`

## 📝 Next Steps

1. **Add Real Video**: Replace the video placeholder with your actual workshop video
2. **Set Up Sponsorship Links**: Connect to your payment/sponsorship platform
3. **Create Documentation**: Add program details in the `/docs` folder
4. **Add Contact Form**: Set up a contact mechanism
5. **Customize Branding**: Add your logo to `static/img/logo.svg`
6. **SEO Optimization**: Update meta tags in `docusaurus.config.ts`

## 🎓 Documentation Structure

The `/docs` folder can contain:
- Program overview
- Workshop curriculum details
- Cognitive science research
- Success stories and testimonials
- FAQ

## 💡 Tips

- The site uses smooth scrolling for anchor links
- Cards have hover effects that lift them up
- The design is optimized for school board presentations
- Color scheme is professional yet modern
- All sections are mobile-responsive

## 🛠️ Tech Stack

- **Docusaurus 3.9**: Modern static site generator
- **React**: Component-based UI
- **TypeScript**: Type-safe development
- **CSS Modules**: Scoped styling
- **Infima**: CSS framework for content sites

## 📞 Support

For questions about customization or deployment, refer to the [Docusaurus documentation](https://docusaurus.io/).
