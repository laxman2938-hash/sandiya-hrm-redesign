# Cloudinary Integration Guide

## Overview

This project uses Cloudinary for image uploads and management. Cloudinary provides optimized image delivery, automatic format conversion, and powerful transformation capabilities.

## Configuration

### Environment Variables

Add the following to your `.env.local` file:

```bash
CLOUDINARY_CLOUD_NAME=djtnwletk
CLOUDINARY_API_KEY=842752279286447
CLOUDINARY_API_SECRET=VLicln3-Rc01idjM6O5cHwQKDqc
CLOUDINARY_URL=cloudinary://842752279286447:VLicln3-Rc01idjM6O5cHwQKDqc@djtnwletk
```

### Vercel Deployment

For production deployment on Vercel, add these environment variables in your Vercel dashboard:

1. Go to your project settings in Vercel
2. Navigate to Environment Variables
3. Add each variable for Production, Preview, and Development environments

## Features

### Image Upload
- **Supported Formats**: JPEG, PNG, WebP, GIF
- **Max File Size**: 10MB (Cloudinary free tier limit)
- **Auto Optimization**: Quality and format automatically optimized
- **Folder Organization**: Images organized by type (candidates, gallery, team, etc.)

### Image Transformations
- Automatic quality optimization
- Format conversion (WebP for modern browsers)
- Responsive delivery
- CDN distribution worldwide

## API Endpoints

### POST /api/upload

Uploads an image file to Cloudinary.

**Request:**
```typescript
const formData = new FormData();
formData.append('file', imageFile);
formData.append('folder', 'gallery'); // optional, defaults to 'general'

fetch('/api/upload', {
  method: 'POST',
  body: formData
})
```

**Response:**
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/djtnwletk/image/upload/v1234567890/sandiya-hr/gallery/1234567890_abc123.jpg",
  "public_id": "sandiya-hr/gallery/1234567890_abc123"
}
```

## Components

### ImageUploader

Reusable component for file uploads with preview and validation.

```tsx
import ImageUploader from '@/components/ImageUploader';

<ImageUploader
  onUpload={(url) => setImageUrl(url)}
  folder="gallery"
  label="Upload Image"
  preview={existingImageUrl}
/>
```

## File Organization

Images are organized in Cloudinary with the following structure:

```
sandiya-hr/
├── candidates/     # Candidate documents (passports, certificates)
├── gallery/        # Gallery images
├── team/          # Team member photos
├── achievements/  # Achievement images
└── general/       # Other uploads
```

## Usage Examples

### Admin Forms

All admin forms (gallery, team, achievements, etc.) use the FileInput component which integrates with Cloudinary automatically.

### Candidates Page

The candidates page uploads passport and experience certificate files to the `candidates/` folder.

### Display Images

Images can be displayed directly using their Cloudinary URLs:

```tsx
<Image 
  src={cloudinaryUrl} 
  alt="Description" 
  width={300} 
  height={200}
/>
```

## Benefits of Cloudinary

1. **Performance**: Global CDN delivery
2. **Optimization**: Automatic compression and format selection
3. **Reliability**: 99.9% uptime SLA
4. **Scalability**: Handles traffic spikes automatically
5. **Security**: Secure upload and delivery
6. **Transformations**: On-the-fly image modifications

## Troubleshooting

### Upload Fails
- Check file size (must be < 10MB)
- Verify file format (JPEG, PNG, WebP, GIF only)
- Ensure environment variables are set correctly

### Images Not Loading
- Verify the Cloudinary URL is valid
- Check network connectivity
- Ensure images haven't been deleted from Cloudinary

### Development Setup
1. Copy `.env.example` to `.env.local`
2. Replace placeholder values with your Cloudinary credentials
3. Restart your development server

## Migration from Supabase

This project has been migrated from Supabase Storage to Cloudinary. The following changes were made:

1. Replaced `@supabase/supabase-js` with `cloudinary`
2. Updated `/api/upload` route to use Cloudinary SDK
3. Changed upload function in candidates page
4. Updated environment variables
5. Modified error handling to match Cloudinary responses

All existing functionality remains the same from a user perspective.