# Blackstone CC Website - Content Editing Guide

This guide explains where to edit fixtures, players, news, gallery, and other content on your Blackstone CC website.

## 📍 File Locations

All editable content is located in the `client/src/pages/` directory:

- **Home Page**: `client/src/pages/Home.tsx`
- **Fixtures**: `client/src/pages/Fixtures.tsx`
- **Players**: `client/src/pages/Players.tsx`
- **News**: `client/src/pages/News.tsx`
- **Gallery**: `client/src/pages/Gallery.tsx`
- **Join Us**: `client/src/pages/JoinUs.tsx`
- **Contact**: `client/src/pages/Contact.tsx`

---

## 🏏 Editing Fixtures & Results

**File**: `client/src/pages/Fixtures.tsx`

Find the `fixtures` array (around line 10):

```typescript
const fixtures = [
  {
    date: "2025-03-15",
    opponent: "Hartford Hawks",
    venue: "Home",
    format: "T20",
    result: "Won",
    score: "165/7 vs 142/9",
  },
  // Add more fixtures here
];
```

**To add a new fixture:**
1. Copy an existing fixture object
2. Update the values (date, opponent, venue, format, result, score)
3. Paste it into the array

**Result options**: `"Won"`, `"Lost"`, `"Upcoming"`

---

## 👥 Editing Player Profiles

**File**: `client/src/pages/Players.tsx`

Find the `players` array (around line 18):

```typescript
const players: Player[] = [
  {
    name: "Rajesh Kumar",
    role: "Captain, All-Rounder",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm medium",
    isCaptain: true,
    isImpactPlayer: true,
  },
  // Add more players here
];
```

**To add a new player:**
1. Copy an existing player object
2. Update the values
3. Set `isCaptain: true` for captain
4. Set `isImpactPlayer: true` for impact players
5. Paste it into the array

**Adding player photos:**
1. Upload photos to `/home/ubuntu/webdev-static-assets/`
2. Use the `manus-upload-file` command to get CDN URLs
3. Add an `image` field to each player object with the CDN URL

---

## 📰 Editing News Posts

**File**: `client/src/pages/News.tsx`

Find the `newsPost` array (around line 18):

```typescript
const newsPost: NewsPost[] = [
  {
    title: "Your News Title",
    date: "March 16, 2025",
    category: "Match Report",
    summary: "Brief summary of the news...",
    image: "https://...",
  },
  // Add more news posts here
];
```

**Category options**: `"Match Report"`, `"Announcement"`, `"Event"`, `"Selection"`

**To add news:**
1. Copy an existing post object
2. Update title, date, category, summary, and image URL
3. Paste it at the beginning of the array (newest first)

---

## 🖼️ Editing Gallery Images

**File**: `client/src/pages/Gallery.tsx`

Find the `galleryImages` array (around line 8):

```typescript
const galleryImages = [
  {
    url: "https://...",
    caption: "Description of the image",
    category: "Matches",
  },
  // Add more images here
];
```

**Category options**: `"Matches"`, `"Action"`, `"Venue"`, `"Team"`, `"Training"`, `"Events"`

**To add images:**
1. Upload images to `/home/ubuntu/webdev-static-assets/`
2. Use `manus-upload-file <filename>` to get CDN URLs
3. Add new objects with the URL, caption, and category

---

## 🎨 Replacing the Logo

The logo is currently a placeholder with "BC" initials.

**To add your actual logo:**

1. Upload your logo to `/home/ubuntu/webdev-static-assets/`
2. Run: `manus-upload-file your-logo.png`
3. Copy the returned CDN URL
4. Edit these files:
   - `client/src/components/Navigation.tsx` (line ~26)
   - `client/src/pages/Home.tsx` (line ~20)
5. Replace the placeholder `<div>` with:
   ```tsx
   <img src="YOUR_CDN_URL" alt="Blackstone CC Logo" className="w-12 h-12 rounded-full" />
   ```

---

## 📧 Updating Contact Information

**File**: `client/src/pages/Contact.tsx`

Update these values (around lines 35-60):

- **Email**: Change `contact@blackstonecc.com`
- **Phone**: Change `+1 (234) 567-890`
- **Location**: Update the location text

Also update footer contact info in:
- `client/src/components/Footer.tsx` (around line 60)

---

## 🔗 CricClubs Integration

The CricClubs iframe is embedded in `client/src/pages/Fixtures.tsx` (around line 120).

**Current URL**: 
```
https://cricclubs.com/ConnecticutCricketLeague1/teams/hPu1xeCvHMLGRWu-iwrX_w?seriesId=duQDJcq0RrsbeBo2nmyLkQ&teamName=BlackStone+CC&seriesName=CCL+Hard+Tennis+Ball+-+TCL+2025
```

If your CricClubs URL is different, replace it in the `<iframe src="...">` tag.

---

## 🎨 Customizing Colors

**File**: `client/src/index.css`

The Heritage Grain theme uses:
- **Background**: Rich deep brown (`#1a1410`)
- **Accent**: Warm gold (`#d4af37`)

To change colors, edit the CSS variables in the `:root` section (around line 45).

---

## 🚀 After Making Changes

1. Save your files
2. The dev server will automatically reload
3. Check the preview to verify your changes
4. When ready, create a new checkpoint using the Management UI
5. Click "Publish" to deploy your updates

---

## 💡 Tips

- **Images**: Always use CDN URLs from `manus-upload-file`, never local file paths
- **Dates**: Use consistent date format (e.g., "March 15, 2025")
- **Testing**: Check mobile responsiveness after adding content
- **Backups**: Create checkpoints before major content updates

---

## 📞 Need Help?

If you need assistance with customization or have questions, refer to the Manus documentation or contact support.
