# UniiLanguage Deployment Guide

Complete guide for deploying UniiLanguage to GitHub Pages or Netlify with security and analytics.

---

## 🚀 Quick Start

### Option 1: GitHub Pages (Free, Simple)
### Option 2: Netlify (Free, More Features)

Both options are free and work great for this static site!

---

## 📋 Prerequisites

- GitHub account (free)
- Your code pushed to GitHub repository
- 5-10 minutes of setup time

---

## 🌐 Option 1: GitHub Pages Deployment

### Step 1: Enable GitHub Pages

1. Go to your GitHub repository: `https://github.com/mariyaaborisa/UniiLanguage`
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under "Build and deployment":
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select your main branch (e.g., `main` or `master`)
   - **Folder**: Select `/ (root)`
5. Click **Save**

### Step 2: Wait for Deployment

- GitHub will build and deploy your site (takes 1-3 minutes)
- Refresh the Settings > Pages page
- You'll see: **"Your site is live at https://mariyaaborisa.github.io/UniiLanguage/"**

### Step 3: Access Your Site

```
https://mariyaaborisa.github.io/UniiLanguage/
```

The root `index.html` will automatically redirect to `uniilanguage/src/index.html`.

### Troubleshooting GitHub Pages

**Problem: Page shows 404**
- Wait 2-3 minutes after first deployment
- Check that you pushed the root `index.html` file
- Verify branch name is correct in Settings

**Problem: Styles not loading**
- Check that all paths are relative (not absolute)
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for errors (F12 → Console)

**Problem: CSP errors in console**
- This is expected and fixed! GitHub Pages injects its own scripts
- The strict CSP has been removed from HTML
- Security is still maintained via other headers

---

## 🚀 Option 2: Netlify Deployment (Recommended)

Netlify offers better performance, custom domains, and instant deploys.

### Step 1: Sign Up for Netlify

1. Go to https://www.netlify.com/
2. Click **Sign Up** → **Sign up with GitHub**
3. Authorize Netlify to access your GitHub

### Step 2: Create New Site

1. Click **Add new site** → **Import an existing project**
2. Choose **GitHub**
3. Search for and select `UniiLanguage`
4. Configure build settings:
   - **Branch to deploy**: `main` or your default branch
   - **Build command**: Leave empty (no build needed)
   - **Publish directory**: `uniilanguage`
5. Click **Deploy site**

### Step 3: Site is Live!

- Netlify assigns a random URL: `https://random-name-123456.netlify.app`
- Your site is live in ~30 seconds!

### Step 4: Customize Domain (Optional)

1. In Netlify dashboard, click **Domain settings**
2. Click **Options** → **Edit site name**
3. Change to: `uniilanguage` (or your preferred name)
4. Your site is now: `https://uniilanguage.netlify.app`

### Step 5: Verify Security Headers

The `netlify.toml` file automatically configures:
- ✅ Content Security Policy (CSP)
- ✅ X-Frame-Options (clickjacking protection)
- ✅ X-Content-Type-Options
- ✅ X-XSS-Protection
- ✅ Permissions-Policy

Check headers at: https://securityheaders.com/

### Netlify Benefits

| Feature | GitHub Pages | Netlify |
|---------|-------------|---------|
| **Free Tier** | ✅ Yes | ✅ Yes |
| **Custom Domain** | ✅ Yes | ✅ Yes |
| **HTTPS** | ✅ Yes | ✅ Yes |
| **Deploy Speed** | 2-3 min | 20-30 sec |
| **Preview Deploys** | ❌ No | ✅ Yes |
| **Rollbacks** | ❌ Manual | ✅ One-click |
| **Security Headers** | ⚠️ Limited | ✅ Full control |
| **Redirects** | ⚠️ Limited | ✅ Powerful |
| **Analytics** | ❌ No | ✅ Yes (paid) |

**Recommendation**: Use **Netlify** for production, GitHub Pages for testing.

---

## 📊 Microsoft Clarity Analytics Setup

Track user behavior, heatmaps, and session recordings (GDPR compliant).

### Step 1: Create Clarity Account

1. Go to https://clarity.microsoft.com/
2. Sign in with Microsoft, Google, or GitHub account
3. Click **Add new project**

### Step 2: Configure Project

1. **Project name**: `UniiLanguage`
2. **Website URL**: Your GitHub Pages or Netlify URL
3. Click **Create**

### Step 3: Get Your Project ID

1. After creating project, you'll see a setup code
2. Find this line:
   ```javascript
   clarity("set", "project", "YOUR_PROJECT_ID");
   ```
3. Copy the project ID (looks like: `abc123def456`)

### Step 4: Add Project ID to Your Code

1. Open `/uniilanguage/src/components/clarity-tracker.js`
2. Find line 15:
   ```javascript
   })(window, document, "clarity", "script", "YOUR_CLARITY_PROJECT_ID");
   ```
3. Replace `YOUR_CLARITY_PROJECT_ID` with your actual ID:
   ```javascript
   })(window, document, "clarity", "script", "abc123def456");
   ```
4. Save and commit the file
5. Push to GitHub (automatic deploy)

### Step 5: Verify Tracking

1. Visit your live site
2. Go back to Clarity dashboard
3. Within 2-3 minutes, you should see "Active users: 1"
4. Click around your site to generate data

### What Clarity Tracks

✅ **Page views** - Which pages are most popular
✅ **User flows** - Path users take through your app
✅ **Heatmaps** - Where users click
✅ **Session recordings** - Watch real user sessions
✅ **Device types** - Mobile vs desktop usage
✅ **Custom tags** - Page types (we pre-configured these!)

### Privacy & GDPR Compliance

- ✅ Clarity is GDPR compliant
- ✅ No personally identifiable information (PII) collected
- ✅ Microsoft doesn't sell data
- ✅ Free forever (unlimited sessions)

---

## 🔒 Security Configuration Summary

### Headers Configured

| Header | Purpose | Status |
|--------|---------|--------|
| **X-Frame-Options** | Prevent clickjacking | ✅ Enabled |
| **X-Content-Type-Options** | Prevent MIME sniffing | ✅ Enabled |
| **X-XSS-Protection** | XSS filter | ✅ Enabled |
| **Content-Security-Policy** | Control resource loading | ✅ Netlify only |
| **Referrer-Policy** | Control referrer info | ✅ Netlify only |
| **Permissions-Policy** | Disable unused features | ✅ Netlify only |

### Security Features Implemented

- ✅ **XSS Prevention**: Input sanitization in `prompt_generator.js`
- ✅ **Clickjacking Protection**: Framebuster script + X-Frame-Options
- ✅ **Global Variable Protection**: Encapsulated in PromptManager module
- ✅ **Blob URL Cleanup**: Memory leak prevention
- ✅ **Input Validation**: URL parameter sanitization
- ✅ **HTTPS**: Enforced by both GitHub Pages and Netlify

---

## 🧪 Testing Your Deployment

### 1. Functional Testing

Visit your deployed site and test:

- [ ] Home page loads correctly
- [ ] "Get Started" button navigates to instructions
- [ ] Instructions pages show correctly
- [ ] Drawing pages load with toolbar visible
- [ ] Timer counts down (10s, 30s, 60s)
- [ ] Drawing tools work (pen, eraser, color picker, size, clear)
- [ ] Save drawing downloads PNG file
- [ ] Navigation between rounds works
- [ ] End screen shows after 60s round
- [ ] "Play Again" and "Main Menu" buttons work

### 2. Mobile Testing

- [ ] Open site on phone/tablet
- [ ] Toolbar moves to bottom on mobile
- [ ] Touch drawing works smoothly
- [ ] Buttons are tap-friendly
- [ ] Text is readable
- [ ] No horizontal scrolling

### 3. Security Testing

#### Test XSS Prevention:
```
https://your-site.com/uniilanguage/src/Drawing_30_sec.html?prompt=<script>alert('XSS')</script>
```
✅ **Expected**: Text shows safely (no alert popup)
❌ **If alert shows**: XSS vulnerability (shouldn't happen with our fixes)

#### Test Clickjacking Protection:
Create test HTML file:
```html
<iframe src="https://your-site.com"></iframe>
```
✅ **Expected**: Frame is blocked or redirects to full page
❌ **If shows in iframe**: Clickjacking vulnerability

#### Check Security Headers:
1. Go to https://securityheaders.com/
2. Enter your site URL
3. Click "Scan"
4. Target score:
   - **Netlify**: A or A+ (excellent)
   - **GitHub Pages**: C or B (limited header support)

### 4. Accessibility Testing

#### Keyboard Navigation:
- [ ] Press Tab to navigate through buttons
- [ ] Press Enter to activate buttons
- [ ] All interactive elements are reachable
- [ ] Focus indicator is visible

#### Screen Reader Testing:
- [ ] Install NVDA (Windows) or VoiceOver (Mac)
- [ ] Navigate through the site
- [ ] All images have alt text read
- [ ] Button purposes are announced
- [ ] Headings are in logical order

#### Color Contrast:
- [ ] Run site through https://wave.webaim.org/
- [ ] Check for contrast errors
- [ ] All text should be readable

### 5. Performance Testing

1. Go to https://web.dev/measure/
2. Enter your site URL
3. Click "Analyze"
4. Target scores:
   - **Performance**: 90+ (green)
   - **Accessibility**: 90+ (green)
   - **Best Practices**: 90+ (green)
   - **SEO**: 90+ (green)

---

## 🔧 Continuous Deployment

### Auto-Deploy on Git Push

Both GitHub Pages and Netlify automatically deploy when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Updated drawing feature"
git push origin main

# ✅ Site automatically rebuilds and deploys!
```

**Deploy Times:**
- **GitHub Pages**: 2-3 minutes
- **Netlify**: 20-30 seconds

### Branch Previews (Netlify Only)

Netlify creates preview URLs for pull requests:

1. Create a new branch: `git checkout -b feature/new-colors`
2. Make changes and push
3. Create pull request on GitHub
4. Netlify comments with preview URL
5. Test changes on preview before merging

---

## 🌍 Custom Domain Setup (Optional)

### For GitHub Pages:

1. Buy domain from Namecheap, Google Domains, etc.
2. Add CNAME record:
   - **Type**: CNAME
   - **Name**: www
   - **Value**: mariyaaborisa.github.io
3. In GitHub Settings > Pages:
   - **Custom domain**: www.yourdomain.com
   - Check **Enforce HTTPS**

### For Netlify:

1. Buy domain from any registrar
2. In Netlify dashboard:
   - Click **Domain settings**
   - Click **Add custom domain**
   - Enter your domain
3. Update DNS at your registrar:
   - Netlify shows exact DNS records to add
4. Wait 24-48 hours for DNS propagation

---

## 📈 Monitoring & Maintenance

### What to Monitor:

1. **Microsoft Clarity Dashboard**
   - Daily active users
   - Popular pages
   - Error clicks
   - Rage clicks (frustrated users)

2. **GitHub Issues**
   - User-reported bugs
   - Feature requests

3. **Browser Console Errors**
   - Check for JavaScript errors
   - Monitor CSP violations (if any)

### Monthly Maintenance:

- [ ] Review Clarity heatmaps for UX improvements
- [ ] Check for broken links
- [ ] Update dependencies (if you add any)
- [ ] Review and respond to user feedback
- [ ] Test on new browser versions

---

## 🆘 Troubleshooting

### Site Won't Load

**Symptom**: White screen or 404 error

**Solutions**:
1. Check GitHub Actions (GitHub Pages) or Netlify deploy logs
2. Verify `index.html` exists in repository root
3. Check browser console for errors (F12)
4. Clear browser cache (Ctrl+Shift+Del)
5. Try incognito/private browsing mode

### Drawing Not Working

**Symptom**: Can't draw on canvas

**Solutions**:
1. Check browser console for JavaScript errors
2. Verify `unified-drawing.js` loaded (Network tab)
3. Try different browser
4. Check if touch events work on mobile
5. Verify canvas element exists in HTML

### Clarity Not Tracking

**Symptom**: No data in Clarity dashboard

**Solutions**:
1. Verify Project ID is correct in `clarity-tracker.js`
2. Check browser console for Clarity script errors
3. Disable ad blockers (they block analytics)
4. Wait 5-10 minutes for data to appear
5. Check Clarity Status page: https://status.clarity.ms/

### Images Not Loading

**Symptom**: Broken image icons

**Solutions**:
1. Check image paths are relative (not absolute)
2. Verify images exist in `uniilanguage/images/` folder
3. Check file names match exactly (case-sensitive!)
4. Look at Network tab in browser (F12) for 404 errors
5. Verify image formats are supported (.svg, .gif, .png, .jpg)

### Fonts Not Loading

**Symptom**: Generic/system fonts instead of Open Sans

**Solutions**:
1. Check network connection
2. Verify Google Fonts URLs are correct
3. Check for CSP blocking fonts (shouldn't happen with our config)
4. Wait for fonts to load (may take a few seconds)

---

## 📞 Support

### Getting Help:

1. **Check FUNCTIONALITY_REVIEW.md** for known issues
2. **GitHub Issues**: Create issue in your repository
3. **Netlify Support**: https://docs.netlify.com/
4. **GitHub Pages Docs**: https://docs.github.com/pages
5. **Clarity Help**: https://docs.microsoft.com/clarity/

### Useful Resources:

- MDN Web Docs: https://developer.mozilla.org/
- Can I Use: https://caniuse.com/ (browser compatibility)
- Web.dev: https://web.dev/ (performance & best practices)
- WAVE: https://wave.webaim.org/ (accessibility checking)

---

## ✅ Deployment Checklist

Before going live:

### Pre-Launch:
- [ ] All tests pass (functional, security, accessibility)
- [ ] Microsoft Clarity Project ID added
- [ ] Images and fonts load correctly
- [ ] Mobile view looks good
- [ ] All links work
- [ ] GitHub repository is public (for GitHub Pages)

### Launch:
- [ ] Deploy to GitHub Pages or Netlify
- [ ] Verify site loads at public URL
- [ ] Test from different devices
- [ ] Check security headers
- [ ] Verify Clarity tracking works

### Post-Launch:
- [ ] Add site URL to README.md
- [ ] Share with testers/users
- [ ] Monitor Clarity for user issues
- [ ] Create feedback collection method
- [ ] Plan future improvements

---

## 🎉 Success!

Your UniiLanguage drawing game is now live and accessible to the world!

**Share your site:**
- GitHub Pages: `https://mariyaaborisa.github.io/UniiLanguage/`
- Netlify: `https://[your-site-name].netlify.app/`

**Track your success:**
- Clarity Dashboard: https://clarity.microsoft.com/

**Next steps:**
- Share with friends and family
- Post on social media
- Collect user feedback
- Plan new features

---

**Last Updated**: 2025-11-01
**Deployment Guide Version**: 1.0
