# Image Upload Feature Documentation

Complete image upload solution with drag-and-drop support, preview, and validation.

## Features

✅ **File Upload Support** - JPEG, PNG, WebP, GIF formats  
✅ **Drag & Drop** - Intuitive drag-and-drop interface  
✅ **Image Preview** - Real-time preview before upload  
✅ **Validation** - Client & server-side validation  
✅ **Size Limit** - 5MB max file size  
✅ **Base64 Storage** - Direct database storage as base64 data URLs  
✅ **Error Handling** - Comprehensive error messages  

## Supported Formats

- **JPEG** (.jpg, .jpeg) - Max 5MB
- **PNG** (.png) - Max 5MB
- **WebP** (.webp) - Max 5MB
- **GIF** (.gif) - Max 5MB

## File Structure

```
src/
├── components/admin/
│   ├── FileInput.tsx        # File upload component
│   └── AdminForm.tsx        # Updated to support files
├── lib/
│   └── imageUpload.ts       # Upload utilities & validation
└── app/
    ├── actions.ts           # Updated actions with file handling
    └── admin/
        ├── gallery/
        ├── team/
        ├── employment-categories/
        ├── legal-documents/
        ├── achievements/
        ├── clients/
        └── demand-letters/
```

## Usage

### In Admin Forms

All admin pages now support file uploads with a simple form field:

```typescript
const formFields = [
  {
    name: "image",
    label: "Upload Image",
    type: "file" as const,
    accept: "image/jpeg,image/png,image/webp,image/gif",
    required: true,
  },
];

<AdminForm
  action={createGalleryImage}
  fields={formFields}
/>
```

### FileInput Component

Standalone file upload component with preview:

```typescript
import { FileInput } from "@/components/admin/FileInput";

export function MyForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <FileInput
      name="image"
      label="Select Image"
      required
      accept="image/jpeg,image/png,image/webp,image/gif"
      onFileSelect={(file) => setSelectedFile(file)}
    />
  );
}
```

**Props:**
```typescript
interface FileInputProps {
  name: string;                    // Input field name
  label: string;                   // Display label
  required?: boolean;              // Required field
  accept?: string;                 // MIME types
  helperText?: string;             // Help text
  onFileSelect?: (file: File) => void;  // Callback
}
```

## Server-Side File Handling

### Helper Functions

Located in `src/lib/imageUpload.ts`:

```typescript
// Validate file
validateImageFile(file: File)
// Returns: { valid: boolean, error?: string }

// Convert to base64
fileToBase64(file: File): Promise<string>
// Returns: data:image/jpeg;base64,...

// Get extension
getFileExtension(mimeType: string): string

// Generate filename
generateFilename(name: string, mimeType: string): string
```

### Server Actions

All create/update actions now handle file uploads:

```typescript
export async function createGalleryImage(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Get file from FormData
  const file = await getFileFromFormData(formData, "image");
  
  if (file) {
    // Convert to base64
    const imageData = await fileToBase64(file);
    
    // Save to database
    const record = await prisma.galleryImage.create({
      data: {
        title: formData.get("title"),
        image: imageData,  // Base64 data URL
      },
    });
  }
}
```

## Data Storage

### Format

Images are stored as **Base64 Data URLs**:

```
data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwsICAwJCAgMCAgICAgICAwMDAwMDAwQDAwMDAwwEAwMDAwwPAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwDAwwD/2wBDAQICAgMCAwUDAwUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgD/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=
```

### Database

Stored in `galleryImage.image`, `teamMember.image`, etc. as TEXT/VARCHAR fields.

### Retrieval

Direct use in `<img>` tags:

```typescript
<img 
  src={image.image}  // Base64 data URL
  alt={image.title}
  className="w-full h-40 object-cover"
/>
```

## Validation

### Client-Side

- File type checking
- File size validation (5MB max)
- Real-time error display
- Visual feedback

### Server-Side

```typescript
// Zod schema validation
const galleryImageSchema = z.object({
  title: z.string().min(2, "Title required"),
  image: z.string().min(1, "Image required"),
});
```

## Updated Admin Pages

All image upload fields now support file uploads:

| Page | Field | Type |
|------|-------|------|
| Gallery | image | file upload |
| Team | image | file upload |
| Employment Categories | image | file upload |
| Legal Documents | image | file upload |
| Achievements | image | file upload |
| Clients | logo | file upload |
| Demand Letters | image | file upload |

## Example: Upload Flow

1. **User selects file** → FileInput component
2. **Validation** → Check type & size
3. **Preview** → Display before submission
4. **Submit** → FormData sent to server action
5. **Convert** → File → Base64
6. **Validate** → Zod schema check
7. **Save** → Store in database
8. **Display** → Show in list/grid

## Performance Notes

### Base64 Considerations

**Pros:**
- ✅ No external storage needed
- ✅ Direct database storage
- ✅ Instant retrieval
- ✅ Works offline

**Cons:**
- ❌ Larger database size (~33% increase)
- ❌ Slower for large files
- ❌ Not ideal for high-traffic apps

**Recommendation:**
For production, consider migrating to cloud storage (Cloudinary, AWS S3) with:
- Smaller database footprint
- Better performance
- CDN distribution

## Troubleshooting

### File not uploading
- Check file format (JPEG, PNG, WebP, GIF)
- Verify file size < 5MB
- Check browser console for errors

### Image not displaying
- Verify image field contains base64 data
- Check browser's image rendering support
- Clear browser cache

### Large database
- Base64 increases storage by ~33%
- Consider external storage for production

## Future Improvements

1. **Cloud Storage Integration**
   - Cloudinary
   - AWS S3
   - Google Cloud Storage

2. **Image Optimization**
   - Compression
   - Resizing
   - Format conversion

3. **Advanced Features**
   - Crop/Edit
   - Multiple uploads
   - Progress tracking

## API Reference

### fileToBase64(file: File): Promise<string>
Converts a File object to a base64 data URL.

```typescript
const base64 = await fileToBase64(selectedFile);
// Returns: "data:image/jpeg;base64,..."
```

### validateImageFile(file: File): {valid: boolean, error?: string}
Validates file type and size.

```typescript
const result = validateImageFile(file);
if (!result.valid) {
  console.error(result.error);
}
```

### getFileFromFormData(formData: FormData, fieldName: string): Promise<File | null>
Extracts file from FormData.

```typescript
const file = await getFileFromFormData(formData, "image");
```

