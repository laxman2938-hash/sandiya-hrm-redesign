# Image Upload - Quick Start Guide

## What Changed?

All admin forms now use **file upload** instead of URL input for images.

### Before (URL Input)
```
Image URL: https://example.com/image.jpg
```

### After (File Upload)
```
Drag and drop image here
Or click to select: JPEG, PNG, WebP, GIF
Max 5MB
```

## How It Works

### 1. Select Image
- Drag image onto form
- Or click to browse files
- Supports: JPEG, PNG, WebP, GIF

### 2. Preview
- See image before uploading
- Clear button to change selection

### 3. Submit
- Click "Add Image" button
- Image converted to base64
- Stored in database
- Shows on website instantly

## Updated Pages

✅ Gallery - `/admin/gallery`  
✅ Team - `/admin/team`  
✅ Employment Categories - `/admin/employment-categories`  
✅ Legal Documents - `/admin/legal-documents`  
✅ Achievements - `/admin/achievements`  
✅ Clients - `/admin/clients`  
✅ Demand Letters - `/admin/demand-letters`  

## File Limits

- **Max Size:** 5MB
- **Formats:** JPEG, PNG, WebP, GIF
- **Validation:** Automatic on both client and server

## Features

✨ **Drag & Drop** - Intuitive interface  
✨ **Live Preview** - See before upload  
✨ **Error Messages** - Clear feedback  
✨ **Validation** - Automatic checks  
✨ **One Click** - No external URLs needed  

## Storage

Images are stored as **base64 data URLs** directly in the database.

```
data:image/jpeg;base64,/9j/4AAQ...
```

### Display

Images display instantly from database:

```typescript
<img src={image.image} alt="Gallery" />
// Shows: data:image/jpeg;base64,...
```

## Example Upload

1. Go to `/admin/gallery`
2. Fill in "Image Title": "Summer Event"
3. Drag image file onto upload area (or click to select)
4. See preview
5. Click "Add Image"
6. Image stored and displayed!

## Troubleshooting

### File won't upload
✗ File size > 5MB? 
✗ Wrong format (not JPEG/PNG/WebP/GIF)?
✗ Browser issue? Try refreshing

### Image not showing
✗ Check browser console for errors
✗ Verify image field has data
✗ Try clearing cache

### Database growing too large
→ Base64 increases size by ~33%
→ Consider cloud storage later (Cloudinary, S3)

## Next Steps

1. **Test** - Upload an image to Gallery
2. **Verify** - See image in list
3. **Manage** - Delete if needed
4. **Scale** - Add more content!

## Developer Info

### Files Modified

- `src/components/admin/FileInput.tsx` - New file input component
- `src/components/admin/AdminForm.tsx` - Updated for files
- `src/app/actions.ts` - File handling in actions
- All admin pages - Updated form fields
- `src/lib/imageUpload.ts` - Utilities
- `src/IMAGE_UPLOAD_GUIDE.md` - Documentation

### Key Functions

```typescript
// Convert file to base64
const imageData = await fileToBase64(file);

// Validate file
const result = validateImageFile(file);

// Get file from form
const file = await getFileFromFormData(formData, "image");
```

## Support

For issues or questions:
- Check `IMAGE_UPLOAD_GUIDE.md` - Technical details
- Check `ADMIN_GUIDE.md` - Admin panel info
- Check `ACTIONS_GUIDE.md` - Server actions reference

