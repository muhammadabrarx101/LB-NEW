# Course Image Loading Troubleshooting Guide

## Issues Fixed

### ✅ 1. Image Not Showing on Course Listing Page
**Cause:** JavaScript regex error that prevented proper background image styling
**Fix:** Simplified the code to directly use the gradient variable instead of parsing it
**Files Updated:** `script.js` (lines 840-864)

### ✅ 2. Image Zooming/Cropping on Sides
**Cause:** `background-size: cover` behavior combined with aspect ratio differences
**Fix:** Added `background-repeat: no-repeat` to CSS to prevent tiling
**Files Updated:** `styles.css` (course-card-header)

### ✅ 3. Detail Page Image Issues
**Cause:** Same regex parsing error
**Fix:** Simplified background-image syntax
**Files Updated:** `course-detail.js` (lines 149-164)

---

## How to Test Your Image

### Step 1: Verify File Setup
- ✅ Image file: `course-22.jpg`
- ✅ Location: `assets/images/courses/course-22.jpg`
- ✅ IGCSE ACADEMICS is course ID 22

### Step 2: Clear Cache & Refresh
1. **Hard Refresh:** `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. **Chrome DevTools:** Press `F12` → Network → Check "Disable cache" → Refresh
3. **Alternative:** Try incognito/private window to bypass all caching

### Step 3: Check Each Page

**🔍 Test 1: Course Listing Page (courses.html)**
```
1. Go to: http://localhost/learningBubble/courses.html
2. Click on "IGCSE ACADEMICS" category tile
3. Look for "IGCSE ACADEMICS" course card
4. Expected: Course card header shows your image (not gradient)
5. If showing: Image loads correctly ✅
6. If showing gradient: Image path issue ❌
```

**🔍 Test 2: Course Detail Page**
```
1. From courses.html, click "View Course" on IGCSE ACADEMICS
2. Expected: Large image in hero section (~550×300px)
3. Image should be clear and not zoomed/cropped
4. If showing: Detail page loads correctly ✅
5. If showing gradient: Image path issue ❌
```

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Image not loading on listing | File not found or wrong path | Check filename is exactly `course-22.jpg` |
| Image zoomed/cropped | Aspect ratio mismatch | Ensure image is exactly 1200×600px |
| Still showing gradient | Browser cache | Hard refresh (Ctrl+Shift+R) |
| Image only on detail, not listing | Code error in script.js | Check files were updated correctly |
| Image pixelated/blurry | Wrong resolution | Verify image is 1200×600px minimum |

---

## Image Aspect Ratio Reference

**Your Image:** 1200px × 600px
- Aspect Ratio: **2:1** (landscape)

**Course Card Header Display:**
- Size: 300px × 180px
- Aspect Ratio: **2:1** (matches your image!)

**Course Detail Page Display:**
- Size: ~550px × 300px  
- Aspect Ratio: **~1.83:1** (close to 2:1, minor zoom)

✅ The aspect ratios are compatible - image should display without cropping on both pages.

---

## Browser DevTools Debug

If image still isn't loading, use Chrome DevTools:

1. **Press F12** to open DevTools
2. **Go to Network tab**
3. **Refresh page** (F5)
4. **Search for "course-22"** in the network requests
5. **Look for:** `assets/images/courses/course-22.jpg`
   - **Status 200:** Image loaded successfully ✅
   - **Status 404:** Image not found (check file path) ❌
   - **Status 0:** CORS or file path issue ❌

---

## Quick Checklist

- [ ] File named exactly `course-22.jpg` (case-sensitive on Linux/Mac)
- [ ] File located in `assets/images/courses/` folder
- [ ] Image resolution is 1200×600px
- [ ] Hard refreshed browser (Ctrl+Shift+R)
- [ ] No console errors (check F12 → Console tab)
- [ ] Visited both courses.html and course detail page
- [ ] Image shows on detail page but not listing? → Check script.js updates
- [ ] Image shows nowhere? → Check file path and cache

---

## If Still Not Working

1. **Rename test:** Try renaming to `course-22-test.jpg` to confirm updates are loading
2. **Fallback test:** Temporarily remove image and confirm gradient shows (means code is working)
3. **Path test:** Try absolute path: `/learningBubble/assets/images/courses/course-22.jpg`
4. **File format:** Try converting to PNG instead of JPG: `course-22.png`
